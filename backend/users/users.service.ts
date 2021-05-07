import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";

let id = 0;

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: ++id,
      email: "alice@example.com",
      password: "changeme",
    },
    {
      id: ++id,
      email: "bob@example.com",
      password: "changeme",
    },
  ].map((x) => {
    const user = new User();
    Object.assign(user, x);
    return x;
  });

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
