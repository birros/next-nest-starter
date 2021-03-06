import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { SecurityModule } from "../security/security.module";
import { TodosController } from "./todos.controller";
import { TodosRepository } from "./todos.repository";

@Module({
  imports: [SecurityModule, PrismaModule],
  controllers: [TodosController],
  providers: [TodosRepository],
})
export class TodosModule {}
