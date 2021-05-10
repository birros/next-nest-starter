import { ApiProperty } from "@nestjs/swagger";
import { UseSchema } from "../../common/decorators/use-schema.decorator";
import { LoginSchema } from "../schemas/login.schema";

@UseSchema(LoginSchema)
export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
