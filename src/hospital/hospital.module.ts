import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalResolver } from './hospital.resolver';
import { HospitalService } from './hospital.service';
import { Hospital, HospitalSchema } from './models/hospital.model';


@Module({
  imports: [MongooseModule.forFeature([{ name: Hospital.name, schema: HospitalSchema }]), MikroOrmModule.forFeature({
    entities: [Hospital]
  }),],
  providers: [HospitalResolver, HospitalService],

})
export class HospitalModule { }
