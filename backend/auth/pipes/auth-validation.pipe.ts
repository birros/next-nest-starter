import { Injectable, PipeTransform } from "@nestjs/common";
import { YupValidationPipe } from "../../common/pipes/yup-validation.pipe";
import { UsersService } from "../../users/users.service";

@Injectable()
export class AuthValidationPipe
  extends YupValidationPipe
  implements PipeTransform {
  constructor(private readonly usersService: UsersService) {
    super();

    this.context = {
      usersService: this.usersService,
    };
  }
}
