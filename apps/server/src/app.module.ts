import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PetModule } from './pet/pet.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, AuthModule, PetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
