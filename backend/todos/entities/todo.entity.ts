import { Todo as ITodo } from "@prisma/client";

export class Todo implements ITodo {
  id: number;
  content: string;
  done: boolean;
  userId: number;
}
