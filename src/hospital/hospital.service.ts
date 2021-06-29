import { Injectable } from '@nestjs/common';
import { InjectModel, Schema as MongooseSchema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewHospitalInput , HospitalUpdate} from './dto/hospital.input';
import { Hospital, HospitalDocument } from './models/hospital.model';

@Injectable()
export class HospitalService {
 
  constructor(@InjectModel(Hospital.name) private hospitalModel: Model<HospitalDocument>) {}
  findAll() {
    return this.hospitalModel.find().exec()
  }
  create(newHospitalData: NewHospitalInput) {
    console.log('newHospitalData :>> ', newHospitalData);
    const creaetedHospital = new this.hospitalModel(newHospitalData);
    console.log('creaetedHospital :>> ', creaetedHospital);
    return creaetedHospital.save();
  }

  findOneAndUpdate(payload: HospitalUpdate) {
    const {_id, ...propsNoId} = payload;
    return this.hospitalModel.findOneAndUpdate(payload._id, propsNoId, {new:true}).exec()
  }

  findOneByName(name: string) {
    return this.hospitalModel.findOne({name}).exec()
  }
}
