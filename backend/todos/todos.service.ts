import { Injectable } from "@nestjs/common";
import { Repository } from "../common/interfaces/repository.interface";
import { Todo } from "./entities/todo.entity";

let id = 0;

@Injectable()
export class TodosService implements Repository<Todo> {
  private readonly todos: Todo[] = [
    {
      id: ++id,
      content: "lorem",
      done: false,
      userId: 2,
    },
    {
      id: ++id,
      content: "lorem",
      done: false,
      userId: 1,
    },
    {
      id: ++id,
      content: "lorem",
      done: false,
      userId: 1,
    },
    {
      id: ++id,
      content: "lorem",
      done: false,
      userId: 1,
    },
  ].map((x) => {
    const todo = new Todo();
    Object.assign(todo, x);
    return todo;
  });

  create(todo: Omit<Todo, "id">): Todo {
    const newTodo = new Todo();
    Object.assign(newTodo, {
      ...todo,
      id: ++id,
    });

    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(userId: number): Todo[] {
    return this.todos.filter((x) => x.userId === userId);
  }

  findOne(id: number): Todo | undefined {
    return this.todos.find((x) => x.id == id);
  }

  update(id: number, todo: Partial<Omit<Todo, "id">>): Todo | undefined {
    const index = this.todos.findIndex((x) => x.id == id);
    if (index < 0) {
      return undefined;
    }

    const newTodo = new Todo();
    Object.assign(newTodo, {
      ...this.todos[index],
      ...todo,
    });

    this.todos[index] = newTodo;
    return newTodo;
  }
}
