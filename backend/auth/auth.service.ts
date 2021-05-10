import { Injectable } from "@nestjs/common";
import SecurePassword from "secure-password";
import { User } from "../users/models/user.model";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  private sp: SecurePassword = new SecurePassword();

  constructor(private usersService: UsersService) {}

  async register(
    email: string,
    password: string
  ): Promise<Omit<User, "password"> | null> {
    const user = await this.usersService.create({
      email,
      password: await this.hashPassword(password),
    });
    if (user) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(
    email: string,
    password: string
  ): Promise<Omit<User, "password"> | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await this.verifyPassword(user.password, password))) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async hashPassword(password: string): Promise<string> {
    const hashedBuffer = await this.sp.hash(Buffer.from(password));
    return hashedBuffer.toString("base64");
  }

  async verifyPassword(
    hashedPassword: string,
    password: string
  ): Promise<boolean> {
    try {
      const res = await this.sp.verify(
        Buffer.from(password),
        Buffer.from(hashedPassword, "base64")
      );
      return [SecurePassword.VALID, SecurePassword.VALID_NEEDS_REHASH].includes(
        res
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
