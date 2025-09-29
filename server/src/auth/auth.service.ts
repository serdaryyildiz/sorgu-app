import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthSignUpCredentialsDto } from './dto/auth.sign-up-credentials.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './jwt-payload.interface';
import { UsersRepo, UsersRepository } from './users.repository';
import { AuthSignInCredentialsDto } from './dto/auth.sign-in-credentials.dto';

@Injectable()
export class AuthService {
  private userRepository: UsersRepo;
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    this.userRepository = UsersRepository(this.dataSource);
    this.jwtService = jwtService;
  }

  signUp(authSignupCredentialsDto: AuthSignUpCredentialsDto): Promise<User> {
    return this.userRepository.createUser(authSignupCredentialsDto);
  }

  async signIn(
    authSignInCredentialsDto: AuthSignInCredentialsDto,
  ): Promise<{ accesToken: string }> {
    const { username, password } = authSignInCredentialsDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: IJwtPayload = { username };
      const accesToken: string = await this.jwtService.sign(payload);
      return { accesToken };
    } else {
      throw new UnauthorizedException(
        'Incorrect username or password , please try again.',
      );
    }
  }
}