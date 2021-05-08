import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<Omit<User, "password">> {
    const user = await this.usersService.findOneByEmail(email);
    if (user?.password === password) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async login(user?: Omit<User, "password">) {
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
