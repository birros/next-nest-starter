import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Repository } from "../common/interfaces/repository.interface";
import { PrismaService } from "../prisma/prisma.service";
import { Todo } from "./models/todo.model";

@Injectable()
export class TodosRepository implements Repository<Todo> {
  constructor(private prisma: PrismaService) {}

  async create(todo: Omit<Todo, "id">): Promise<Todo> {
    const data = await this.prisma.todo.create({ data: todo });
    return plainToClass(Todo, data);
  }

  async findAll(userId: number): Promise<Todo[]> {
    const data = await this.prisma.todo.findMany({ where: { userId } });
    return plainToClass(Todo, data);
  }

  async findOne(id: number): Promise<Todo | null> {
    const data = await this.prisma.todo.findUnique({ where: { id } });
    return plainToClass(Todo, data);
  }

  async update(
    id: number,
    todo: Partial<Omit<Todo, "id">>
  ): Promise<Todo | null> {
    const data = await this.prisma.todo.update({ where: { id }, data: todo });
    return plainToClass(Todo, data);
  }

  async delete(id: number): Promise<Todo | null> {
    const data = await this.prisma.todo.delete({ where: { id } });
    return plainToClass(Todo, data);
  }
}
