import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document ,Schema as MongooseSchema} from 'mongoose';

import { ObjectId } from 'mongodb'
import { PrimaryKey, SerializedPrimaryKey, Property, Entity } from '@mikro-orm/core'

export type HospitalDocument = Hospital & Document;


@Schema()
@ObjectType()
@Entity({ tableName: 'hospitals' })
export class Hospital {

  @PrimaryKey()
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  
  @Field({ nullable: true })
  @SerializedPrimaryKey()
  public id!: string

  @Prop()
  @Property()
  @Field(type => String)
  name: string;

  @Prop()
  @Property()
  @Field(type => String)
  address: string;

  @Prop()
  @Property()
  @Field(type => String)
  state: string;

  @Prop()
  @Property()
  @Field(type => [Int])
  managersIds: number[];

  @Prop()
  @Property()
  @Field(type => String)
  email: string;
}


export const HospitalSchema = SchemaFactory.createForClass(Hospital)