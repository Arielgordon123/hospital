import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserInput } from './dto/user.input';
import { User, UserDocument, UserRoles } from './models/user.model';
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
  findOneAndUpdate(payload: UpdateUserInput) {
    return bcrypt.hash(payload.password, 10).then(hash => {
      const { _id, ...updatedUser } = payload;
      updatedUser.password = hash
      return this.userModel.findOneAndUpdate(payload._id, updatedUser).exec()
    })
  }

  async login(email: string, password: string) {
    const found = await this.userModel.findOne({ "profile.email": email });

    if (found && Object.values(UserRoles).includes(found.role as UserRoles)) {
      return bcrypt.compare(password, found.password).then((result) => {
        if (result) {
          return found;
        }
      })
    }
    throw new UnauthorizedException('Error! wrong user or password');

  }
}
