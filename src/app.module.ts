import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { HospitalModule } from './hospital/hospital.module';
import { UserModule } from './user/user.module';

import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL, { useFindAndModify: false }),
    HospitalModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
