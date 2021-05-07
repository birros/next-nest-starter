import { UseSchema } from "../../common/decorators/use-schema.decorator";
import { UpdateTodoSchema } from "../schemas/update-todo.schema";

@UseSchema(UpdateTodoSchema)
export class UpdateTodoDto {
  content?: string;
  done?: boolean;
}
