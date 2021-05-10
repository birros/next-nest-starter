import { Injectable, PipeTransform } from "@nestjs/common";
import { YupValidationPipe } from "../../common/pipes/yup-validation.pipe";
import { UsersRepository } from "../../users/users.repository";

@Injectable()
export class AuthValidationPipe
  extends YupValidationPipe
  implements PipeTransform {
  constructor(private readonly usersService: UsersRepository) {
    super();

    this.context = {
      usersService: this.usersService,
    };
  }
}
