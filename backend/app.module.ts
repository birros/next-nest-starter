import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { TodosModule } from "./todos/todos.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [AuthModule, UsersModule, TodosModule],
})
export class AppModule {}
