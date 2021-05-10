import { PrismaClient, User } from "@prisma/client";
import { AuthService } from "../backend/auth/auth.service";
import { PrismaService } from "../backend/prisma/prisma.service";
import { UsersRepository } from "../backend/users/users.repository";

const prisma = new PrismaClient();
const prismaService = prisma as PrismaService;
const usersService = new UsersRepository(prismaService);
const authService = new AuthService(usersService);

type Name = "alice" | "bob";
const names: readonly Name[] = ["alice", "bob"];

async function seedUsers() {
  const users: Omit<User, "id">[] = names.map((name) => ({
    email: `${name}@example.com`,
    password: "changeme",
  }));

  const items = await Promise.all(
    users.map(async ({ email, password }) => {
      return await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          email,
          password: await authService.hashPassword(password),
        },
      });
    })
  );

  return items.reduce<Record<string, User>>((accu, user) => {
    const name = user.email.split("@")[0] as Name;
    accu[name] = user;
    return accu;
  }, {}) as Record<Name, User>;
}

async function seedTodos(users: Record<Name, User>) {
  await Promise.all(
    Object.values(users).map(async (user) => {
      const count = await prisma.todo.count({ where: { user } });
      if (count > 0) {
        return;
      }

      await Promise.all(
        Array.from(Array(3)).map(async (_) => {
          await prisma.todo.create({
            data: {
              content: "lorem",
              done: false,
              userId: user.id,
            },
          });
        })
      );
    })
  );
}

async function main() {
  const users = await seedUsers();
  await seedTodos(users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
