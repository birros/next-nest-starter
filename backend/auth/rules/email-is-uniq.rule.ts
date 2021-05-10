import * as yup from "yup";
import { UsersRepository } from "../../users/users.repository";

export const emailIsUniq = (message: string) => {
  return async (
    value: string | undefined,
    { path, options }: yup.TestContext<Record<string, any>>
  ) => {
    const { context } = options;

    const usersService =
      context?.usersService instanceof UsersRepository
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
