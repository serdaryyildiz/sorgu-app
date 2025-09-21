import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthSignUpCredentialsDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  username: string;

  @IsString()
  @Matches(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim , {
    message:
    "Please enter valid email addres"
  })
    email:string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 upper character , 1 special character and 1 numerical character .',
  })
  password: string;
}