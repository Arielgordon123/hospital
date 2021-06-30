import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
export default class PageData {

    @Field(() => String)
    userId: MongooseSchema.Types.ObjectId;

    @Field(type => Int)
    public limit: number

    @Field(type => Int)
    public offset: number
}
