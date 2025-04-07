import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { DemoController } from 'src/demo/demo.controller';
import { DemoService } from 'src/demo/demo.service';

@Module({
    imports: [
        AuthModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('jwt.access'),
                signOptions: {
                    expiresIn: configService.get<string>(
                        'jwt.accessExpiresIn',
                        '1h',
                    ),
                },
            }),
        }),
    ],
    controllers: [DemoController],
    providers: [DemoService],
    exports: [DemoService],
})
export class DemoModule {}
