import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document ,Schema as MongooseSchema} from 'mongoose';

export type HospitalDocument = Hospital & Document;


@Schema()
@ObjectType()
export class Hospital {

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  
  @Prop()
  @Field(type => String)
  name: string;

  @Prop()
  @Field(type => String)
  address: string;

  @Prop()
  @Field(type => String)
  state: string;

  @Prop()
  @Field(type => [Int])
  managersIds: number[];

  @Prop()
  @Field(type => String)
  email: string;
}


export const HospitalSchema = SchemaFactory.createForClass(Hospital);