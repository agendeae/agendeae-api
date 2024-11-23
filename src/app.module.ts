import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SharedModule } from './shared/shared.module'
import { EstablishmentModule } from './establishment/establishment.module'
import { AdminModule } from './admin/admin.module'
import { AuthModule } from './auth/auth.module'
import { ClientModule } from './client/client.module'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,load: [configuration]}),
    SharedModule,
    EstablishmentModule,
    AdminModule,
    AuthModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
