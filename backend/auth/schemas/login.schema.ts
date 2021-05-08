import * as yup from "yup";
import { SchemaOf } from "yup";
import { LoginDto } from "../dtos/login.dto";

export const LoginSchema: SchemaOf<LoginDto> = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(1).required(),
  })
  .noUnknown();
