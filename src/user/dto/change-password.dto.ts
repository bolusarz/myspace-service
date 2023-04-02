import { MinLength } from 'class-validator';

export class ChangePasswordDto {
  @MinLength(1)
  oldPassword: string;
  @MinLength(1)
  newPassword: string;
}
