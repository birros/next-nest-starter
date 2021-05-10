import { UseSchema } from "../../common/decorators/use-schema.decorator";
import { RegisterSchema } from "../schemas/register.schema";

@UseSchema(RegisterSchema)
export class RegisterDto {
  email: string;
  password: string;
  confirm: string;
}
