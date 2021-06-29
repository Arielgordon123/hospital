import { Field, InputType } from '@nestjs/graphql';
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
