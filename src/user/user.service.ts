import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserDBService } from './userdb.service';
import { User } from '@prisma/client';
import { exclude } from '../helpers';
import { UpdateUserDto } from './dto/update-user.dto';
import _ from 'lodash';
import { LoginDto } from './dto/login.dto';
import * as jose from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_KEY);

@Injectable()
export class UserService {
  constructor(private userDb: UserDBService) {}

  async createUser(userDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { firstname, lastname, email, password } = userDto;
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    const exists = await this.userDb.user({ email });

    if (exists) {
      throw new HttpException({ message: 'User exists already' }, 400);
    }
    const user = await this.userDb.createUser({
      firstname,
      lastname,
      email,
      password: newPassword,
    });
    return exclude(user, ['password']);
  }

  async updateUser(
    userId: number,
    userDto: UpdateUserDto
  ): Promise<Omit<User, 'password'>> {
    const updateData = _.pickBy(userDto, _.isUndefined);
    return this.userDb.updateUser({ where: { id: userId }, data: updateData });
  }

  async authenticateUser({ email, password }: LoginDto): Promise<string> {
    const user = await this.userDb.user({ email });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return new jose.SignJWT({ id: user.id })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('1d')
          .sign(secret);
      }
      throw new HttpException({ message: 'Invalid email or password' }, 400);
    }
    throw new HttpException({ message: 'Invalid email or password' }, 400);
  }
}
