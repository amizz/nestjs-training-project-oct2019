import { Module } from '@nestjs/common';
import { OauthController } from './oauth/oauth.controller';
import { OauthService } from './oauth/oauth.service';
import { TokenService } from './token/token.service';
import { DevicesModule } from '../devices/devices.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [DevicesModule],
  controllers: [OauthController, AuthController],
  providers: [OauthService, TokenService]
})
export class AuthModule {}
