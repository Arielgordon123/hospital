import { Args, Int, Query, Resolver ,Mutation} from '@nestjs/graphql';
import { NewUserInput, UpdateUserInput } from './dto/user.input';
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

  @Mutation(returns => User)
  async updateUserMutation(@Args('updatedUserData') updatedUserData: UpdateUserInput) {
    return this.userService.findOneAndUpdate(updatedUserData);
  }

  
  @Mutation(returns => User)
  async loginWithPermissionsMutation(@Args('userName') userName: string, @Args('password') password: string) {
    return this.userService.login(userName, password);
  }
//   @ResolveField()
//   async posts(@Parent() author: Author) {
//     const { id } = author;
//     return this.postsService.findAll({ authorId: id });
//   }
}

