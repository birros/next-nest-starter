import { ApiProperty } from "@nestjs/swagger";
import { Todo as ITodo } from "@prisma/client";

export class Todo implements ITodo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  done: boolean;

  @ApiProperty()
  userId: number;
}
