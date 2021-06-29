import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewHospitalInput, HospitalUpdate } from './dto/hospital.input';

import { HospitalService } from './hospital.service';
import { Hospital } from './models/hospital.model';

@Resolver(of => Hospital)
export class HospitalResolver {
  constructor(
    private hospitalService: HospitalService,
  ) {}

  @Mutation(returns => Hospital)
  async createHospitalMutation(@Args('newHospitalData') newHospitalData: NewHospitalInput) {
    console.log('newHospitalData :>> ', newHospitalData);
    return this.hospitalService.create(newHospitalData);
  }

  @Mutation(returns => Hospital)
  async updateHospitaMutation(@Args('updatedHospitalData') updatedHospitalData: HospitalUpdate) {
    return this.hospitalService.findOneAndUpdate(updatedHospitalData);
  }
  
  @Query(returns => [Hospital])
  async getHospitalMutation() {
    return this.hospitalService.findAll();
  }
//   @ResolveField()
//   async posts(@Parent() author: Author) {
//     const { id } = author;
//     return this.postsService.findAll({ authorId: id });
//   }
}