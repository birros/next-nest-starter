import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<Omit<User, "password"> | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user?.password === password) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }
}
