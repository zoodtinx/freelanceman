import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
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
    providers: [DemoService],
    exports: [DemoService],
})
export class DemoModule {}
