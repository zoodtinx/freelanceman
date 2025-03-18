import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
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
       const databaseUrl = this.configService.get<string>('database.url')
       console.log(`Connected to the database: ${databaseUrl}`)
   }

   async onModuleDestroy() {
       await this.$disconnect()
       const databaseUrl = this.configService.get<string>('database.url')
       console.log(`Disconnected from the database: ${databaseUrl}`)
   }
}