import { ApiPropertyOptional } from "@nestjs/swagger";
import { UseSchema } from "../../common/decorators/use-schema.decorator";
import { UpdateTodoSchema } from "../schemas/update-todo.schema";

@UseSchema(UpdateTodoSchema)
export class UpdateTodoDto {
  @ApiPropertyOptional({})
  content?: string;

  @ApiPropertyOptional()
  done?: boolean;
}
