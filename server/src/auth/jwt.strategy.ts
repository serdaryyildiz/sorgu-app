import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepo, UsersRepository } from "./users.repository";
import { DataSource } from "typeorm";
import { IJwtPayload } from "./jwt-payload.interface";
import { User } from "./entity/user.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    private usersRepository:UsersRepo;
    constructor(private dataSource:DataSource , private configService:ConfigService){
        super({
            secretOrKey:configService.get<string>("JWT_SECRET_KEY"),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
        this.usersRepository = UsersRepository(this.dataSource);
    }

    async validate(payload:IJwtPayload) : Promise<User |null>{
        const {username} = payload;
        const user = this.usersRepository.findOne({where : {username}});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}