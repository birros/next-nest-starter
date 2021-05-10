import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreateTodoDto } from "./dtos/create-todo.dto";
import { TodosService } from "./todos.service";
import { Todo } from "./models/todo.model";
import { YupValidationPipe } from "../common/pipes/yup-validation.pipe";
import { Request } from "express";
import { UpdateTodoDto } from "./dtos/update-todo.dto";
import { Action } from "../security/ability.factory";
import { CheckPolicy, PolicyGuard } from "../security/policy.guard";
import { AppAuthGuard } from "../auth/app-auth.guard";

@UseGuards(AppAuthGuard)
@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(
    @Body(YupValidationPipe) createTodoDto: CreateTodoDto,
    @Req() req: Request
  ): Promise<Todo> {
    return this.todosService.create({
      ...createTodoDto,
      done: false,
      userId: req.user?.id || -1,
    });
  }

  @Get()
  async findAll(@Req() req: Request): Promise<Todo[]> {
    return this.todosService.findAll(req.user?.id || -1);
  }

  @Patch(":id")
  @UseGuards(PolicyGuard)
  @CheckPolicy(TodosService.name, Action.Update)
  async update(
    @Body(YupValidationPipe) updateTodoDto: UpdateTodoDto,
    @Param("id") id: string
  ): Promise<Todo | null> {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(":id")
  @UseGuards(PolicyGuard)
  @CheckPolicy(TodosService.name, Action.Delete)
  async delete(@Param("id") id: string): Promise<Todo | null> {
    return this.todosService.delete(+id);
  }
}
