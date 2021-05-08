import {
  Controller,
  Req,
  Post,
  Body,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { YupValidationPipe } from "../common/pipe/yup-validation.pipe";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(
    @Body(YupValidationPipe) { email, password }: LoginDto,
    @Req() req: Request
  ) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    req.session.user = user;
    return user;
  }

  @Post("logout")
  async logout(@Req() req: Request) {
    req.session.user = undefined;
  }
}
