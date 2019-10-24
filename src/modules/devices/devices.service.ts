import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { DeviceDto, DeviceInterface } from '../../schemas/devices.schema';
const uuidv1 = require('uuid/v1')
import { randomBytes } from 'crypto';

@Injectable()
export class DevicesService {
    constructor(@InjectModel('Devices') private devicesModel : Model<any>) {}

    async create(devicesDto : DeviceDto) {
        let result = await new this.devicesModel(devicesDto).save(); 
        return {
            status: 'CREATED',
            _id: result._id
        } 
    }

    async getAll() : Promise<DeviceInterface[]> {
        return await this.devicesModel.find();
    }

    async getById(id : String) : Promise<DeviceInterface> {
       return await this.devicesModel.findOne({
           _id: id
       });
    }

    async getByParam(param : Object) : Promise<DeviceInterface[]> {
        return await this.devicesModel.find(param);
    }

    async updateById(id: String, deviceDto : DeviceDto) {
        return await this.devicesModel.updateOne({
            _id: id
        }, deviceDto);
    }

    async delete(id: String) {
        return await this.devicesModel.deleteOne({
            _id: id
        });
    }

    async generateCredential(id: String) {
        //Create client_id
        let client_id = uuidv1();
        //Create client_secret
        let client_secret = randomBytes(16).toString('hex');

        await this.devicesModel.updateOne({
            _id: id
        }, {
            credential: {
                client_id,
                client_secret
            }
        })

        return {
            status: 'OK'
        }
    }

    async getDeviceCount() {
        return await this.devicesModel.countDocuments();
    }
}

