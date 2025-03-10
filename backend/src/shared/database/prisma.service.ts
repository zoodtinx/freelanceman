import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
   constructor(private readonly configServicer: ConfigService) {
      super({
         datasources: {
            db:{
               url: configServicer.get<string>('DATABASE_URL'),
            }
         }
      })
   }

   async onModuleInit() {
       await this.$connect()
       const databaseUrl = this.configServicer.get('DATABASE_URL')
       console.log(`Connected to the database: ${databaseUrl}`)
   }

   async onModuleDestroy() {
       await this.$disconnect()
       const databaseUrl = this.configServicer.get('DATABASE_URL')
       console.log(`Disconnected from the database: ${databaseUrl}`)
   }
}