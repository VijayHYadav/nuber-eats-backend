import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>
    ) { }

    async createAccout({email, password, role}: CreateAccountInput): Promise<string | undefined> {
        try {
            // check new user
            const exists = await this.users.findOne({ email });
            if (exists) {
                // make error
                return "There is a user with that email already";
            }
            await this.users.save(this.users.create({ email, password, role }));
            return;
        } catch (e) {
            return "Couldn't create account";
        }
    }
}