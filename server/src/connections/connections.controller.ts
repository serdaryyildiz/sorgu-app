import { Body, Controller, Post } from '@nestjs/common';
import { ConnectionsRegisterCredentialsDto } from './dto/connections.register-credentials.dto';

@Controller('connections')
export class ConnectionsController {
    @Post("/connect")
    async connectToDb(@Body() connectionsRegisterCredentialsDto: ConnectionsRegisterCredentialsDto){
        
    }
}
