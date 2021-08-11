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
});

const mockJwtService = {
    sign: jest.fn(() => "signed-token-baby"),
    verify: jest.fn()
}

const mockMailService = {
    sendVerificationEmail: jest.fn(),
}

type MockRepository<T = any> = Partial<Record<keyof Repository<User>, jest.Mock>>;

describe("UserService", () => {

    let service: UsersService;
    let userRepository: MockRepository<User>;
    let verificationRespository: MockRepository<Verification>;
    let mailService: MailService;
    let jwtService: JwtService;

    beforeEach(async () => {
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
        mailService = module.get<MailService>(MailService);
        jwtService = module.get<JwtService>(JwtService);
        userRepository = module.get(getRepositoryToken(User));
        verificationRespository = module.get(getRepositoryToken(Verification));
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
            userRepository.save.mockResolvedValue(createAccoutArgs);
            verificationRespository.create.mockReturnValue({
                user: createAccoutArgs
            });
            verificationRespository.save.mockResolvedValue({
                code: "code"
            });
            const result = await service.createAccout(createAccoutArgs);

            expect(userRepository.create).toHaveBeenCalledTimes(1);
            expect(userRepository.create).toHaveBeenCalledWith(createAccoutArgs);

            expect(userRepository.save).toHaveBeenCalledTimes(1)
            expect(userRepository.save).toHaveBeenCalledWith(createAccoutArgs);

            expect(verificationRespository.create).toHaveBeenCalledTimes(1);
            expect(verificationRespository.create).toHaveBeenCalledWith({ user: createAccoutArgs });

            expect(verificationRespository.save).toHaveBeenCalledTimes(1)
            expect(verificationRespository.save).toHaveBeenCalledWith({ user: createAccoutArgs });

            expect(mailService.sendVerificationEmail).toHaveBeenCalledTimes(1);
            expect(mailService.sendVerificationEmail).toHaveBeenCalledWith(expect.any(String), expect.any(String));
            expect(result).toEqual({ ok: true });
        });

        it('should fail on exception', async () => {
            userRepository.findOne.mockRejectedValue(new Error(":"));
            const result = await service.createAccout(createAccoutArgs);
            expect(result).toEqual({ ok: false, error: "Couldn't create account" })
        });

    });

    describe('login', () => {
        const loginArgs = { email: '', password: '' }
        it('should fail if user does not exist', async () => {
            userRepository.findOne.mockReturnValue(null);
            const result = await service.login(loginArgs);
            expect(userRepository.findOne).toHaveBeenCalledTimes(1);
            expect(userRepository.findOne).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
            expect(result).toEqual({
                ok: false,
                error: 'User not found',
            });
        });

        it('should fail if the password is wrong', async () => {
            const mockedUser = {
                checkPassword: jest.fn(() => Promise.resolve(false)),
            };
            userRepository.findOne.mockResolvedValue(mockedUser);
            const result = await service.login(loginArgs);
            expect(result).toEqual({ ok: false, error: 'Wrong password' });
        });

        it('should return token if password correct', async () => {
            const mockedUser = {
                id: 1,
                checkPassword: jest.fn(() => Promise.resolve(true)),
            };
            userRepository.findOne.mockResolvedValue(mockedUser);
            const result = await service.login(loginArgs);
            expect(jwtService.sign).toHaveBeenCalledTimes(1);
            expect(jwtService.sign).toHaveBeenCalledWith(expect.any(Number));
            expect(result).toEqual({ ok: true, token: 'signed-token-baby' });
        })
    });
    it.todo('findById');
    it.todo('editProfile');
    it.todo('verifyEmail');
});