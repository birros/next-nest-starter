import { Injectable } from "@nestjs/common";
import { User } from "./models/user.model";
import { PrismaService } from "../prisma/prisma.service";
import { plainToClass } from "class-transformer";
import { Repository } from "../common/interfaces/repository.interface";

@Injectable()
export class UsersService implements Repository<User> {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<User | null> {
    const data = this.prisma.user.findUnique({ where: { id } });
    return plainToClass(User, data);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const data = this.prisma.user.findUnique({ where: { email } });
    return plainToClass(User, data);
  }
}
