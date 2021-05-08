import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";
import { SecurityModule } from "../security/security.module";
import { TodosController } from "./todos.controller";
import { TodosService } from "./todos.service";

@Module({
  imports: [AuthModule, SecurityModule, PrismaModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
