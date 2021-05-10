import {
  Controller,
  Req,
  Post,
  Body,
  UnauthorizedException,
  InternalServerErrorException,
} from "@nestjs/common";
import { ApiDefaultResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { UserDto } from "./dtos/user.dto";
import { AuthValidationPipe } from "./pipes/auth-validation.pipe";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @ApiTags("auth")
  @ApiDefaultResponse({ type: UserDto })
  async register(
    @Body(AuthValidationPipe) { email, password }: RegisterDto
  ): Promise<UserDto> {
    const user = await this.authService.register(email, password);
    if (!user) {
      throw new InternalServerErrorException();
    }
    return user;
  }

  @Post("login")
  @ApiTags("auth")
  @ApiDefaultResponse({ type: UserDto })
  async login(
    @Body(AuthValidationPipe) { email, password }: LoginDto,
    @Req() req: Request
  ): Promise<UserDto> {
    const user = await this.authService.login(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    req.session.user = user;
    return user;
  }

  @Post("logout")
  @ApiTags("auth")
  @ApiDefaultResponse()
  async logout(@Req() req: Request): Promise<void> {
    req.session.user = undefined;
  }
}
