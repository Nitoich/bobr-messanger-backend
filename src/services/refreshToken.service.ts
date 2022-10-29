import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RefreshToken} from "../entities/refreshToken.entity";
import {DataSource, Repository} from "typeorm";
import * as crypto from "crypto";
import {UserService} from "./user.service";

@Injectable()
export class RefreshTokenService {
    constructor(@InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>,
    private dataSource: DataSource,
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

    async update(id, data): Promise<RefreshToken> {
        await this.dataSource
            .createQueryBuilder()
            .update(RefreshToken)
            .set(data)
            .where("id = :id", { id })
            .execute();

        return await this.whereOne({ id });
    }

    async create(userId): Promise<RefreshToken> {

        const createdTime = new Date().getTime();

        const refreshToken = {
            user: await this.userService.findOne(userId),
            refresh_token:  crypto.randomBytes(64).toString('hex'),
            created_time: String(createdTime),
            expired_time: String(createdTime + 30 * 24 * 60 * 60 * 1000)
        };

        await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(RefreshToken)
            .values([
                refreshToken
            ])
            .execute()

        return await this.refreshTokenRepository.findOneBy({
            refresh_token: refreshToken.refresh_token,
        })
    }
}