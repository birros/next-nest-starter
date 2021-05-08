import { Controller, Req, Get, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AppAuthGuard } from "../auth/app-auth.guard";

@UseGuards(AppAuthGuard)
@Controller("users")
export class UsersController {
  @Get("me")
  async me(@Req() req: Request) {
    return req.user;
  }
}
