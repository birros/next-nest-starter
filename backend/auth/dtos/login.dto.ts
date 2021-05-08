import { UseSchema } from "../../common/decorators/use-schema.decorator";
import { LoginSchema } from "../schemas/login.schema";

@UseSchema(LoginSchema)
export class LoginDto {
  email: string;
  password: string;
}
