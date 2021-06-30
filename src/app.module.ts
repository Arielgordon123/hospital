import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { HospitalModule } from './hospital/hospital.module';
import { UserModule } from './user/user.module';

import { MongooseModule } from '@nestjs/mongoose';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Hospital } from './hospital/models/hospital.model';


@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),

    MikroOrmModule.forRoot({
      type: 'mongo',
      entities: [Hospital],
      dbName: 'Nest',
      clientUrl: process.env.DB_URL
    }),
      
    HospitalModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
