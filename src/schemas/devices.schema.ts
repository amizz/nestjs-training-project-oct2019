import { Schema } from "mongoose";
import { MinLength, IsOptional, IsNotEmpty } from 'class-validator';

export const DevicesSchema = new Schema({
    device_code: {
        type: String,
        unique: true
    },
    active: Boolean,
    credential: Object
})

export class DeviceDto {
    @IsNotEmpty()
    @MinLength(4)
    device_code: String;

    @IsNotEmpty()
    active: Boolean = false;

    @IsOptional()
    credential: CredentialInterface;

    get getClientId() {
        return this.credential.client_id;
    }

    get getClientSecret() {
        return this.credential.client_secret;
    }
}

export interface CredentialInterface {
    client_id: String,
    client_secret: String
}

export interface DeviceInterface {
    _id: String,
    device_code: String,
    active: Boolean,
    credential: Object
}