import * as yup from "yup";
import { TypeOfShape } from "yup/lib/object";

export const atLeastOneOf = (
  message: (path: string, keys: string[]) => string
) => {
  return (
    value: TypeOfShape<{}>,
    ctx: yup.TestContext<Record<string, any>>
  ) => {
    const schemaKeys = Object.keys(ctx.schema.fields);
    const filledKeys = Object.keys(value);

    if (
      typeof value !== "object" ||
      schemaKeys.some((f) => !(value as Record<string, any>)[f])
    )
      if (filledKeys.length === 0) {
        return new yup.ValidationError(message(ctx.path, schemaKeys));
      }

    return true;
  };
};
