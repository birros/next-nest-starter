import {
  Controller,
  Req,
  Post,
  Body,
  UnauthorizedException,
  InternalServerErrorException,
} from "@nestjs/common";
import { Request } from "express";
import { User } from "../users/models/user.model";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { AuthValidationPipe } from "./pipes/auth-validation.pipe";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(
    @Body(AuthValidationPipe) { email, password }: RegisterDto
  ): Promise<Omit<User, "password">> {
    const user = await this.authService.register(email, password);
    if (!user) {
      throw new InternalServerErrorException();
    }
    return user;
  }

  @Post("login")
  async login(
    @Body(AuthValidationPipe) { email, password }: LoginDto,
    @Req() req: Request
  ): Promise<Omit<User, "password">> {
    const user = await this.authService.login(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    req.session.user = user;
    return user;
  }

  @Post("logout")
  async logout(@Req() req: Request): Promise<void> {
    req.session.user = undefined;
  }
}
