import { Controller, Req, Get, UseGuards } from "@nestjs/common";
import { ApiDefaultResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { AppAuthGuard } from "../auth/app-auth.guard";
import { MeDto } from "./dtos/me.dto";

@UseGuards(AppAuthGuard)
@Controller("users")
export class UsersController {
  @Get("me")
  @ApiTags("users")
  @ApiDefaultResponse({ type: MeDto })
  async me(@Req() req: Request) {
    return req.user;
  }
}
