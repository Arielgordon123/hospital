import { Field, InputType, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

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