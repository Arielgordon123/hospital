import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { UserProfile } from '../models/user-profile.model';



@InputType()
export class NewUserInput {

    @Field()
    password: string;

    @Field()
    role: string;

    @Field()
    lastLoginAt: string;

    @Field(type => UserProfile)
    profile: UserProfile;
}

@InputType()
export class UpdateUserInput extends NewUserInput {
    @Field(() => String)
    _id: MongooseSchema.Types.ObjectId;
}