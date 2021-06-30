import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';

import { HospitalResolver } from './hospital.resolver';
import { HospitalService } from './hospital.service';
import { Hospital, HospitalSchema } from './models/hospital.model';


@Module({
  imports: [MongooseModule.forFeature([{ name: Hospital.name, schema: HospitalSchema }]), UserModule],
  providers: [HospitalResolver, HospitalService],

})
export class HospitalModule {}
function PaginateModel<T>(): any {
  throw new Error('Function not implemented.');
}

