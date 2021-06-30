import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document , Schema as MongooseSchema } from 'mongoose';
import { UserResolver } from '../user.resolver';
import { UserProfile } from './user-profile.model';

export enum UserRoles {
  Basic = 'hospital-manager',
  Admin = 'division-manager',
}
registerEnumType(UserRoles, { name: 'UserRoles' })

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {

  @Field(() => String, {nullable: true})
  _id?: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(type => String)
  password: string;

  @Prop()
  @Field(type => String)
  role: string;

  @Prop()
  @Field(type => String)
  lastLoginAt: string;

  @Prop()
  @Field(type => UserProfile)
  profile: UserProfile;

}

export const UserSchema = SchemaFactory.createForClass(User);