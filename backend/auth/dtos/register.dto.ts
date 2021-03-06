import { ApiProperty } from "@nestjs/swagger";
import { UseSchema } from "../../common/decorators/use-schema.decorator";
import { RegisterSchema } from "../schemas/register.schema";

@UseSchema(RegisterSchema)
export class RegisterDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirm: string;
}
