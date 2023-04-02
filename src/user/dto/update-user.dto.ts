import { IsEmail, MinLength, ValidateIf } from "class-validator";
import { Optional } from "@nestjs/common";

export class UpdateUserDto {
  @MinLength(3)
  @ValidateIf((o) => !o.lastname || !o.email || o.firstname)
  firstname: string;
  @MinLength(3)
  @Optional()
  @ValidateIf((o) => !o.firstname || !o.email || o.lastname)
  lastname: string;
  @IsEmail()
  @ValidateIf((o) => !o.firstname || !o.lastname || o.email)
  email: string;
}
