import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from "@nestjs/common";
import { ModuleRef, Reflector } from "@nestjs/core";
import { Repository } from "../common/interfaces/repository.interface";
import { Action, AbilityFactory } from "./ability.factory";

type CheckPolicyPayload = {
  repo: string;
  action: Action;
};

export const CHECK_POLICY_KEY = "check_policy";

export const CheckPolicy = (repo: string, action: Action) => {
  const payload: CheckPolicyPayload = { repo, action };
  return SetMetadata(CHECK_POLICY_KEY, payload);
};

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly abilityFactory: AbilityFactory,
    private readonly moduleRef: ModuleRef
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const payload =
      this.reflector.get<CheckPolicyPayload>(
        CHECK_POLICY_KEY,
        context.getHandler()
      ) || undefined;

    const { user, params } = context.switchToHttp().getRequest();
    const id = +params.id;

    const ability = this.abilityFactory.createForUser(user);

    const service = this.moduleRef.get(payload.repo) as Repository<any>;
    const item = await service.findOne(id);

    return ability.can(payload.action, item);
  }
}
