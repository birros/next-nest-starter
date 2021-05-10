import * as yup from "yup";
import { SchemaOf } from "yup";
import Reference from "yup/lib/Reference";
import { RegisterDto } from "../dtos/register.dto";
import { emailIsUniq } from "../rules/email-is-uniq.rule";

const PASSWORD_FIELD_KEY = "password";

export const RegisterSchema: SchemaOf<RegisterDto> = yup
  .object({
    email: yup
      .string()
      .email()
      .test(emailIsUniq("email already registered"))
      .required(),
    [PASSWORD_FIELD_KEY]: yup
      .string()
      .min(8)
      .max(32)
      .matches(/[0-9]+/, "${path} must contain at least one digit")
      .matches(/[a-z]+/, "${path} must contain at least one lowercase letter")
      .matches(/[A-Z]+/, "${path} must contain at least one capital letter")
      .required(),
    confirm: yup
      .string()
      .oneOf(
        [yup.ref(PASSWORD_FIELD_KEY)],
        ({ path, values }: { path: string; values: Reference }) => {
          const ref = values.toString().replace("Ref(", "").replace(")", "");
          return `${ref} and ${path} must match`;
        }
      )
      .required(),
  })
  .noUnknown();
