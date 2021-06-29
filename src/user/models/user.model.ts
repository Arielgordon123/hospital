import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document , Schema as MongooseSchema } from 'mongoose';
import { UserResolver } from '../user.resolver';
import { UserProfile } from './user-profile.model';

enum Roles {
  Basic = 'hospital-manager',
  Admin = 'division-manager',
}

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {

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