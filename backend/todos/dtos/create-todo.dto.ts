import { UseSchema } from "../../common/decorators/use-schema.decorator";
import { CreateTodoSchema } from "../schemas/create-todo.schema";

@UseSchema(CreateTodoSchema)
export class CreateTodoDto {
  content: string;
}
