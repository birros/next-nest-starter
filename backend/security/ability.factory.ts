import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Todo } from "../todos/entities/todo.entity";
import { User } from "../users/entities/user.entity";

export enum Action {
  Manage = "manage",
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

export type Subjects = InferSubjects<typeof Todo> | "all";

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>
    );

    can(Action.Update, Todo, { userId: user.id });
    can(Action.Delete, Todo, { userId: user.id });

    return build({
      detectSubjectType: (item) => {
        return item?.constructor as ExtractSubjectType<Subjects>;
      },
    });
  }
}
