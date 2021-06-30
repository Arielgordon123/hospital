import { Injectable } from '@nestjs/common';
import { InjectModel, Schema as MongooseSchema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { NewHospitalInput , HospitalUpdate} from './dto/hospital.input';
import { Hospital, HospitalDocument } from './models/hospital.model';

@Injectable()
export class HospitalService {

 
  constructor(@InjectModel(Hospital.name) private hospitalModel: Model<HospitalDocument>, @InjectRepository(Hospital) private repo: EntityRepository<Hospital>) {}
  
  findAll() {
    return this.hospitalModel.find().exec()
  }
  create(newHospitalData: NewHospitalInput) {
    // const [ name,address,state, managersIds, email] =newHospitalData ;
    // const creaetedHospital = new Hospital( name,address,state, managersIds, email);
    // await this.repo.persistAndFlush(creaetedHospital)
    // return creaetedHospital;
    const creaetedHospital = new this.hospitalModel(newHospitalData);
    return creaetedHospital.save();
  }

  // findOneAndUpdate(payload: HospitalUpdate) {
  //   const {_id, ...propsNoId} = payload;
  //   return this.hospitalModel.findOneAndUpdate(payload._id, propsNoId, {new:true}).exec()
  // }

  async getAllHospitalsForUser(limit: number, offset: number): Promise<[Hospital[], number]>  {
    // this.hospitalModel.find(query)

    const hospitals = await this.repo.findAndCount({}, {limit, offset});
    console.log('hospitals :>> ', hospitals);
    return hospitals;
  }
  findOneByName(name: string) {
    return this.hospitalModel.findOne({name}).exec()
  }
}
