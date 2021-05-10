import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { SecurityModule } from "../security/security.module";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";

@Module({
  imports: [SecurityModule, PrismaModule],
  providers: [UsersRepository],
  controllers: [UsersController],
  exports: [UsersRepository],
})
export class UsersModule {}
