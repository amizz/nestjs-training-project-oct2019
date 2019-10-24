import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

@Injectable()
export class TokenService {
    constructor() {
    }

    async createAccessToken(tokenPayload: any, expiresIn : any): Promise < any > {
        return await jwt.sign(tokenPayload, process.env.SECRET, {
            expiresIn: expiresIn
        });
    }

    async createRefreshToken(): Promise < any > {
        let refreshToken = await randomBytes(16).toString('hex');
        return refreshToken;
    }

    async accessTokenValidity(token : string): Promise < any > {
        return await jwt.verify(token, process.env.SECRET);
    }
}
