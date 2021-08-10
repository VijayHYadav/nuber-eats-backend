import { Test } from "@nestjs/testing";
import { UsersService } from "./users.service";

// UserService Test
describe("UserService", () => {

    let service: UsersService;

    beforeAll(async () => {
        // Creation of testing module
        const module = await Test.createTestingModule({
            providers: [UsersService]
        }).compile();
        service = module.get<UsersService>(UsersService)
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it.todo('createAccout');
    it.todo('login');
    it.todo('findById');
    it.todo('editProfile');
    it.todo('verifyEmail');
});