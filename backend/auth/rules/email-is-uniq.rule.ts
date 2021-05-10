import * as yup from "yup";
import { UsersService } from "../../users/users.service";

export const emailIsUniq = (message: string) => {
  return async (
    value: string | undefined,
    { path, options }: yup.TestContext<Record<string, any>>
  ) => {
    const { context } = options;

    const usersService =
      context?.usersService instanceof UsersService
        ? context.usersService
        : undefined;

    if (!usersService) {
      return new yup.ValidationError("usersService is missing", value, path);
    }

    if (!value) {
      return new yup.ValidationError(`${path} is required`, value, path);
    }

    const count = await usersService.countByEmail(value);
    if (count > 0) {
      return new yup.ValidationError(message, value, path);
    }

    return true;
  };
};
