import { Module } from "@nestjs/common";
import { TodosModule } from "./todos/todos.module";

@Module({
  imports: [TodosModule],
})
export class AppModule {}
