import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/models/user.model";

export class UserDto implements Omit<User, "password"> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;
}
