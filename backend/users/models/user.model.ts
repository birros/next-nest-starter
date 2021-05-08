import { User as IUser } from "@prisma/client";

export class User implements IUser {
  id: number;
  email: string;
  password: string;
}
