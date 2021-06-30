import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import ConnectionArgs from 'src/connection.args';
import { NewHospitalInput, HospitalUpdate, HospitalResponse } from './dto/hospital.input';

import { HospitalService } from './hospital.service';
import { Hospital } from './models/hospital.model';

@Resolver(of => Hospital)
export class HospitalResolver {
  constructor(
    private hospitalService: HospitalService,
  ) { }

  @Mutation(returns => Hospital)
  async createHospitalMutation(@Args('newHospitalData') newHospitalData: NewHospitalInput) {
    return this.hospitalService.create(newHospitalData);
  }

  // @Mutation(returns => Hospital)
  // async updateHospitaMutation(@Args('updatedHospital') updatedHospital: HospitalUpdate) {
  //   return this.hospitalService.findOneAndUpdate(updatedHospital);
  // }


  @Query(returns => HospitalResponse)
  async allHospitalsForUserQuery(@Args() args: ConnectionArgs): Promise<HospitalResponse> {
    // return this.hospitalService.getAllHospitalsForUser(query);

    const { limit, offset } = args.pagingParams()
    const [hospitals, count] = await this.hospitalService.getAllHospitalsForUser(limit, offset)
    const page = connectionFromArraySlice(
      hospitals, args, { arrayLength: count, sliceStart: offset || 0 },
    )

    return { page, pageData: { count, limit, offset } }
  }
}