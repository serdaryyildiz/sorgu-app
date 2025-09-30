import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignUpCredentialsDto } from './dto/auth.sign-up-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './entity/user.entity';
import { AuthSignInCredentialsDto } from './dto/auth.sign-in-credentials.dto';

@Controller('auth')
export class AuthController {
    
    constructor(private authService:AuthService){
        this.authService=authService;
    }
    @Post("/sign-up")
    signUp(@Body() authSignupCredentialsDto:AuthSignUpCredentialsDto) :Promise<User>{
        console.log("auth");
        return this.authService.signUp(authSignupCredentialsDto);
    }

    @Post("/sign-in")
    signIn(@Body() authSignInCredentialsDto:AuthSignInCredentialsDto): Promise<{accessToken: string}>{
        return this.authService.signIn(authSignInCredentialsDto);
    }
}
