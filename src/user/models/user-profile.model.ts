import { ObjectType, Field, InputType } from '@nestjs/graphql';

@InputType('UserProfileInput')
@ObjectType()
export class UserProfile {
  @Field(type => String)
  firstName: string;

  @Field(type => String)
  lastName: string;
  @Field(type => String)
  email: string;

  @Field(type => String)
  phone: string;
}
