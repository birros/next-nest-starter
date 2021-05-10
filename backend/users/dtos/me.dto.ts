import { ApiProperty } from "@nestjs/swagger";
import { User } from "../models/user.model";

export class MeDto implements Omit<User, "password"> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;
}
