import { Controller , Get} from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    getHealth():String{
        try {
            return "200 OK";
        }catch(e){
            return `Error :\n${(e as Error).message}`;
        }
    }
}
