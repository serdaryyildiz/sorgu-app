import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';
import { AuthSignUpCredentialsDto } from './dto/auth.sign-up-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

export const UsersRepository = (dataSource: DataSource) =>
  dataSource.getRepository(User).extend({
    async createUser(authSignupCredentialsDto: AuthSignUpCredentialsDto): Promise<User> {
      const { email,username, password } = authSignupCredentialsDto;

      //hash 
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.create({
        username,
        email,
        password: hashedPassword,
      });

      try {
        await this.save(user);
      } catch (error) {
        if (error.code === '23505') {
          // 23505 is postgres duplicate username error
          throw new ConflictException('Username already exists');
        } else {
          throw new InternalServerErrorException();
        }
      }

      return user;
    },
  });

export type UsersRepo = ReturnType<typeof UsersRepository>;