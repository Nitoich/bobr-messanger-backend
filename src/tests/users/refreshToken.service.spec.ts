import {RefreshTokenService} from "../../services/users/refreshToken.service";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {RefreshToken} from "../../entities/users/refreshToken.entity";
import {User} from "../../entities/users/user.entity";
import {UserService} from "../../services/users/user.service";
import {UserServiceMock} from "../mocks/services/user.service.mock";
import {UserRepositoryMock} from "../mocks/repositories/user.repository.mock";
import {UserDtoMock} from "../mocks/dtos/user.mock";
import {RefreshTokenRepositoryMock} from "../mocks/repositories/refreshToken.repository.mock";
import {RefreshTokenDtoMock} from "../mocks/dtos/refreshToken.dto.mock";

describe('refresh_token', () => {
    let service: RefreshTokenService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RefreshTokenService,
                {
                    provide: getRepositoryToken(RefreshToken),
                    useValue: RefreshTokenRepositoryMock
                },
                UserService,
                {
                    provide: UserService,
                    useValue: UserServiceMock
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: UserRepositoryMock
                }
            ],
        }).compile();

        service = module.get<RefreshTokenService>(RefreshTokenService);
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it('should return new refresh token', async () => {
        const userId = 1;
        expect(await service.create(userId)).toEqual({
            created_time: expect.any(String),
            expired_time: expect.any(String),
            refresh_token: expect.any(String),
            id: expect.any(Number),
            user: {
                id: userId,
                ...UserDtoMock
            }
        });
    })

    it('should return updated refresh token', async () => {
        const refreshTokenId = 1;
        expect(await service.update(refreshTokenId, RefreshTokenDtoMock)).toEqual({
            id: refreshTokenId,
            ...RefreshTokenDtoMock
        })
    })
})