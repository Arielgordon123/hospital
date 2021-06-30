import { Field, InputType, ArgsType, Int, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Hospital } from '../models/hospital.model';
import relayTypes from 'src/relay.types';

@InputType()
export class NewHospitalInput { 
    @Field()
    name: string;
  
    @Field()
    address: string;
    
    @Field()
    state: string;
  
    @Field(type=> [String])
    managersIds: string[];
  
    @Field()
    email: string;
}

@InputType()
export class HospitalUpdate extends NewHospitalInput {    
    @Field(() => String)
    _id: MongooseSchema.Types.ObjectId
}

@ObjectType()
export class HospitalResponse extends relayTypes<Hospital>(Hospital) {}