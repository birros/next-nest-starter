import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from "@nestjs/common";
import { ValidationError } from "yup";

interface Error {
  path?: string;
  message: string;
}

const serializeValidationError = (err: ValidationError): Error[] => {
  return err.inner.map(({ path, message }) => ({
    path,
    message,
  }));
};

@Injectable()
export class YupValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const { schema } = metatype?.prototype;
    if (!schema) return value;

    try {
      await schema.validate(value, { abortEarly: false, strict: true });
    } catch (err) {
      throw new BadRequestException(serializeValidationError(err));
    }
    return value;
  }
}
