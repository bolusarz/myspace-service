import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<{ message: string }> {
    const res = await this.userService.createUser(user);
    if (res) {
      return { message: 'User created successfully' };
    }
    throw new HttpException('Unknown Error', HttpStatus.BAD_REQUEST);
  }

  @Post('auth')
  @HttpCode(200)
  async login(
    @Body() user: LoginDto
  ): Promise<{ message: string; token: string }> {
    const token = await this.userService.authenticateUser(user);
    if (token) {
      return { message: 'Login successful', token };
    }
    throw new HttpException('Unknown Error', HttpStatus.BAD_REQUEST);
  }

  @UseGuards(AuthGuard)
  @Post('password/change')
  @HttpCode(200)
  async changePassword(
    @Request() req,
    @Body() payload: ChangePasswordDto
  ): Promise<{ message: string }> {
    const res = await this.userService.changePassword({
      id: req.user.id,
      ...payload,
    });
    if (res) {
      return res;
    }
    throw new HttpException('Unknown Error', HttpStatus.BAD_REQUEST);
  }
}
