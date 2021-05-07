import * as yup from "yup";
import { CreateTodoDto } from "../dtos/create-todo.dto";

export const CreateTodoSchema: yup.SchemaOf<CreateTodoDto> = yup
  .object({
    content: yup.string().min(1).required(),
  })
  .noUnknown();
