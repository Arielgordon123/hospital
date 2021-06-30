import { Injectable } from '@nestjs/common';
import { InjectModel, Schema as MongooseSchema } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { type } from 'os';
import { User, UserRoles } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { NewHospitalInput, HospitalUpdate } from './dto/hospital.input';
import { Hospital, HospitalDocument } from './models/hospital.model';

@Injectable()
export class HospitalService {

  constructor(@InjectModel(Hospital.name) private hospitalModel: Model<HospitalDocument>, private userService: UserService) { }
  findAll() {
    return this.hospitalModel.find().exec()
  }
  create(newHospitalData: NewHospitalInput) {
    const creaetedHospital = new this.hospitalModel(newHospitalData);
    return creaetedHospital.save();
  }

  findOneAndUpdate(payload: HospitalUpdate) {
    const { _id, ...propsNoId } = payload;
    return this.hospitalModel.findOneAndUpdate(payload._id, propsNoId, { new: true }).exec()
  }

  async findHospitalsPaginated(userId: string, first: number, limit: number) {

    return this.userService.getUserAndRole(userId).then(({role}: User) => {
      if (role == UserRoles.Admin) { // division-manager - can get all hospitals 
        return  this.hospitalModel.find({}).sort({}).skip(first).limit(limit).exec() 
      } else if (role == UserRoles.Basic) { // hospital-manager - can get just his hospital

        return  this.hospitalModel.find({'managersIds': userId}).sort({}).skip(first).limit(limit).exec() 
      }
    })

  }

  findOneByName(name: string) {
    return this.hospitalModel.findOne({ name }).exec()
  }
}
