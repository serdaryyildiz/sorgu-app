import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignUpCredentialsDto } from './dto/auth.sign-up-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './entity/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){
        this.authService=authService;
    }
    @Post("/sign-up")
    signUp(@Body() authSignupCredentialsDto:AuthSignUpCredentialsDto) :Promise<User>{
        return this.authService.signUp(authSignupCredentialsDto);
    }

    @Post("/sign-in")
    signIn(@Body() AuthSignUpCredentialsDto:AuthSignUpCredentialsDto): Promise<{accesToken: string}>{
        return this.authService.signIn(AuthSignUpCredentialsDto);
    }
}
