import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtService } from "src/jwt/jwt.service";
import { MailService } from "src/mail/mail.service";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Verification } from "./entities/verification.entity";
import { UsersService } from "./users.service";

const mockRepository = () => ({
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
})

const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn()
}

const mockMailService = {
    sendVerificationEmail: jest.fn(),
}

type MockRepository<T = any> = Partial<Record<keyof Repository<User>, jest.Mock>>;

describe("UserService", () => {

    let service: UsersService;
    let userRepository: MockRepository<User>;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockRepository()
                },
                {
                    provide: getRepositoryToken(Verification),
                    useValue: mockRepository()
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
                {
                    provide: MailService,
                    useValue: mockMailService,
                },
            ]
        }).compile();
        service = module.get<UsersService>(UsersService);
        userRepository = module.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    describe('createAccout', () => {
        const createAccoutArgs = {
            email: "",
            password: "",
            role: 0
        }
        it("should fail if user exists", async () => {
            userRepository.findOne.mockResolvedValue({
                id: 1,
                email: "mock@email.com"
            });
            const result = await service.createAccout(createAccoutArgs);
            expect(result).toMatchObject({
                ok: false,
                error: 'There is a user with that email already',
            });
        });
        it('should create a new user', async () => {
            userRepository.findOne.mockReturnValue(undefined);
            userRepository.create.mockReturnValue(createAccoutArgs);
            await service.createAccout(createAccoutArgs);
            expect(userRepository.create).toHaveBeenCalledTimes(1);
            expect(userRepository.create).toHaveBeenCalledWith(createAccoutArgs);
            expect(userRepository.save).toHaveBeenCalledTimes(1)
            expect(userRepository.save).toHaveBeenCalledWith(createAccoutArgs);
        });
    });
    it.todo('login');
    it.todo('findById');
    it.todo('editProfile');
    it.todo('verifyEmail');
});