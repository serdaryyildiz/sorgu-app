import { Controller , Get} from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import configuration from "../config/configuration"

const {base_url} = configuration();

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
    ){}

    @Get()
    @HealthCheck()
    getHealth(){
        return this.health.check([
            () => this.http.pingCheck('server-status' , base_url)
        ])
    }
}
