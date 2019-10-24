import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesSchema } from '../../schemas/devices.schema';

const mongooseModule = MongooseModule.forFeature([{
  name: 'Devices',
  schema: DevicesSchema
}]);

@Module({
  imports: [mongooseModule],
  providers: [DevicesService],
  controllers: [DevicesController],
  exports: [mongooseModule, DevicesService]
})
export class DevicesModule {}
