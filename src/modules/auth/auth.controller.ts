import { Controller, Post, Get, Req, ForbiddenException } from '@nestjs/common';
import { OauthService } from './oauth/oauth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(public oauthService : OauthService) {}

    @Post('oauth')
    async oauthGrant(@Req() req : Request) {
        let credential = {
            'device_code': this.oauthService.grantByDeviceCode(req.body.device_code, req.body.client_id, req.body.client_secret),
            'refresh_token': this.oauthService.grantByRefreshToken(req.body.refresh_token),
            'basic': ''
        }

        return await credential[req.body.grant_type] ? credential[req.body.grant_type] : new ForbiddenException();
    }
}