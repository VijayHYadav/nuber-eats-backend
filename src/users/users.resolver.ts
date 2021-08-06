import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(of => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService
    ){}

    @Query(returns => Boolean)
    hi() {
        return true;
    }

    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args("input") createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        try {
            const error = await this.usersService.createAccout(createAccountInput);
            if (error) {
                return {
                    ok: false,
                    error,
                };
            }
            return {
                ok: true,
            }
        } catch (error) {
            return {
                error,
                ok: false,
            }
        }
    }
}