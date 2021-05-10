import { ApiProperty } from "@nestjs/swagger";
import { UseSchema } from "../../common/decorators/use-schema.decorator";
import { UpdateTodoSchema } from "../schemas/update-todo.schema";

@UseSchema(UpdateTodoSchema)
export class UpdateTodoDto {
  @ApiProperty()
  content?: string;

  @ApiProperty()
  done?: boolean;
}
