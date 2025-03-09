import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import {PrismaModule} from "../prisma/prisma.module";
import { PartyService } from './party/party.service';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, PartyService],
})
export class AppModule {}
