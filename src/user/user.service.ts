import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserInput } from './dto/new-user.input';
import { User, UserDocument } from './models/user.model';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  findAll() {
    return this.userModel.find().exec()
  }
  create(newUserData: User) {
    return bcrypt.hash(newUserData.password, 10).then(hash => {
      const user = {
        ...newUserData, password: hash
      }
      const creaetedUser = new this.userModel(user);
      return creaetedUser.save();
    })
  }
  findOneById(id: number) {
    throw new Error('Method not implemented.');
  }
}
