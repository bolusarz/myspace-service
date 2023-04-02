import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
  @MinLength(3)
  firstname: string;
  @MinLength(3)
  lastname: string;
  @IsEmail()
  email: string;
  @MinLength(5)
  password: string;
}
