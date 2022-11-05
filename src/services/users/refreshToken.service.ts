import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RefreshToken} from "../../entities/users/refreshToken.entity";
import {DataSource, Repository} from "typeorm";
import * as crypto from "crypto";
import {UserService} from "./user.service";

@Injectable()
export class RefreshTokenService {
    constructor(@InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>,
    private userService: UserService) {}

    async where(where) {
        const refreshTokens = await this.refreshTokenRepository.findBy(where);
        return refreshTokens;
    }

    async whereOne(where): Promise<RefreshToken> {
        const refreshToken = await this.refreshTokenRepository.findOne({
            relations: {
                user: true
            },
            where: where
        });
        return refreshToken;
    }

    async update(id:number, data): Promise<RefreshToken> {
        return await this.refreshTokenRepository.save({
            id,
            ...data
        });
    }

    async create(userId: number): Promise<RefreshToken> {
        const createdTime = new Date().getTime();
        const refreshToken = {
            user: await this.userService.findOne(userId),
            refresh_token:  crypto.randomBytes(64).toString('hex'),
            created_time: String(createdTime),
            expired_time: String(createdTime + 30 * 24 * 60 * 60 * 1000)
        };
        const newRefreshToken = await this.refreshTokenRepository.create(refreshToken);
        return await this.refreshTokenRepository.save(newRefreshToken);
    }
}