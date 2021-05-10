import { Controller, Req, Get, UseGuards } from "@nestjs/common";
import { ApiDefaultResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { AppAuthGuard } from "../auth/app-auth.guard";
import { UserDto } from "../auth/dtos/user.dto";

@UseGuards(AppAuthGuard)
@ApiTags("users")
@Controller("users")
export class UsersController {
  @Get("me")
  @ApiDefaultResponse({ type: UserDto })
  async me(@Req() req: Request) {
    return req.user;
  }
}
