import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthController } from 'src/auth/auth.controller';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
}
