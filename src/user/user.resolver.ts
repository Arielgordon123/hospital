import { Args, Int, Query, Resolver ,Mutation} from '@nestjs/graphql';
import { NewUserInput } from './dto/new-user.input';

import {  User } from './models/user.model';
import { UserService } from './user.service';


@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}

  // @Query(returns => User)
  // async createUserMutation(@Args('id', { type: () => Int }) id: number) {
  //   return this.hospitalService.findOneById(id);
  // }
  @Mutation(returns => User)
  async createUserMutation(@Args('newUserData') newUserData: NewUserInput) {
    return this.userService.create(newUserData);
  }

//   @ResolveField()
//   async posts(@Parent() author: Author) {
//     const { id } = author;
//     return this.postsService.findAll({ authorId: id });
//   }
}

