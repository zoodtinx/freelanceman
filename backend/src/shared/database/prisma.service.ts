import { Injectable, OnModuleInit, OnModuleDestroy, Global } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
   constructor(private readonly configService: ConfigService) {
      super({
         datasources: {
            db:{
               url: configService.get<string>('database.url'),
            }
         }
      })
   }

   async onModuleInit() {
       await this.$connect()
   }

   async onModuleDestroy() {
       await this.$disconnect()
   }
}