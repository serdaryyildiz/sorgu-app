import { IsIn, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { Type } from 'class-transformer';

export class ConnectionsRegisterCredentialsDto {

    @IsString()
    @MinLength(2)
    @MaxLength(25)
    connection_name:string;

    @IsIn(['postgres', 'mysql', 'mssql'])
    db_type: 'postgres' | 'mysql' | 'mssql';

    @IsString()
    host: string; 

    @IsString()
    db_username:string;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @Max(65535) // 65,535 is the highest available tcp port
    db_port:number;


    @IsString()
    db_password:string;

    @IsOptional()
    ssl?:boolean;
}