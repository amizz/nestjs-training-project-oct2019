import { Injectable } from '@nestjs/common';
import { DevicesService } from '../../devices/devices.service';
import { TokenService } from '../token/token.service';
import * as Redis from 'ioredis';

@Injectable()
export class OauthService {
    redis = Redis(6379, 'localhost', {
        db: 0
    })

    constructor(
        private deviceService : DevicesService,
        private tokenService : TokenService,
    ) {
    }

    async grantByDeviceCode(device_code, client_id, client_secret) {
        let device = await this.deviceService.getByParam({
            device_code: device_code,
            'credential.client_id': client_id,
            'credential.client_secret': client_secret
        });

        if(device.length == 0) throw new Error("Unknown device auth")

        /**
         * Access Token
         * Refresh Token
         */
        let accessToken = await this.tokenService.createAccessToken({id: device[0]._id}, '1d');
        let refreshToken = await this.tokenService.createRefreshToken()

        this.redis.set(refreshToken, device_code);

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }

    async grantByRefreshToken(refresh_token) {
        let device_code = await this.redis.get(refresh_token);

        let device = await this.deviceService.getByParam({
            device_code: device_code
        });

        if(device.length == 0) throw new Error("Unknown device auth")

        /**
         * Access Token
         * Refresh Token
         */
        let accessToken = await this.tokenService.createAccessToken({id: device[0]._id}, '1d');
        let refreshToken = await this.tokenService.createRefreshToken()
        
        await this.redis.del(refresh_token);
        await this.redis.set(refreshToken, device_code);

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }
}
