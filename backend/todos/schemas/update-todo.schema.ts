import * as yup from "yup";
import { atLeastOneOf } from "../../common/rules/at-least-one-of.rule";
import { UpdateTodoDto } from "../dtos/update-todo.dto";

export const UpdateTodoSchema: yup.SchemaOf<UpdateTodoDto> = yup
  .object({
    content: yup.string().min(1).optional(),
    done: yup.boolean().optional(),
  })
  .test(
    atLeastOneOf((path, keys) => {
      const prefix = path ? `${path} ` : "";
      const list = keys.join(", ");
      return `${prefix}must have at least one of these keys: ${list}`;
    })
  )
  .noUnknown();
