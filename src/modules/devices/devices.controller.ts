import { Controller, Get, Post, Put, Delete, UseGuards, Param, Body } from '@nestjs/common';
import { Response, Request } from 'express';
import { DevicesService } from './devices.service';
import { DeviceDto } from '../../schemas/devices.schema';

@Controller('devices')
export class DevicesController {
    constructor(
        private deviceService : DevicesService
    ) {}

    @Get()
    getAllDevices() {
        return this.deviceService.getAll();
    }

    @Get(':id')
    getDeviceById(@Param('id') id : String) {
        return this.deviceService.getById(id);
    }

    @Post()
    createDevice(@Body() device : DeviceDto) {
        return this.deviceService.create(device);
    }

    @Put(':id')
    updateDevice(@Param('id') id : String, @Body() device : DeviceDto) {
        return this.deviceService.updateById(id, device);
    }

    @Delete(':id')
    deleteDevice(@Param('id') id : String) {
        return this.deviceService.delete(id);
    }

    @Post('credential/:id')
    generateCredential(@Param('id') id : String) {
        return this.deviceService.generateCredential(id);
    }

    @Get('count')
    countDevices() {
        return this.deviceService.getDeviceCount();
    }
}
