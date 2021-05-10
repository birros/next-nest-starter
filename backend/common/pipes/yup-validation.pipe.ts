import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from "@nestjs/common";
import { SchemaOf, ValidationError } from "yup";
import { AnyObject } from "yup/lib/types";

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
  protected context: AnyObject | undefined;

  constructor() {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    const schema = metatype?.prototype?.schema as SchemaOf<{}> | undefined;
    if (!schema) {
      return value;
    }

    try {
      await schema.validate(value, {
        abortEarly: false,
        strict: true,
        context: this.context,
      });
    } catch (err) {
      throw new BadRequestException(serializeValidationError(err));
    }
    return value;
  }
}
