import {Test, TestingModule} from "@nestjs/testing";
import {UserService} from "../../services/users/user.service";
import {getRepositoryToken} from "@nestjs/typeorm";
import {User} from "../../entities/users/user.entity";
import {UserRepositoryMock} from "../mocks/repositories/user.repository.mock";
import {UserDtoMock} from "../mocks/dtos/user.mock";

describe('UsersService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, {
                provide: getRepositoryToken(User),
                useValue: UserRepositoryMock,
            }]
        }).compile();

        service = module.get<UserService>(UserService);
    });


    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create new user', async () => {
        expect(await service.create(UserDtoMock)).toEqual({
            id: expect.any(Number),
            ...UserDtoMock
        });
    })

    it('should update user', async () => {
        const userId = 1;

        expect(await service.update(userId, UserDtoMock)).toEqual({
            id: userId,
            ...UserDtoMock
        })
    })

    it('should return users list', async () => {
        expect(await service.findAll()).toEqual({});
    })

    it('should return deleted user', async () => {
        const userId = 1;
        expect(await service.delete(userId)).toEqual({
            id: userId,
            ...UserDtoMock
        });
    })

    it('should return one user by id', async () => {
        const userId = 1;
        expect(await service.findOne(userId)).toEqual({
            id: userId,
            ...UserDtoMock
        })
    })

})
