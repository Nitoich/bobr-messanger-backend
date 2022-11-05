import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Chat} from "../../entities/chat/chat.entity";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class ChatsService {
    constructor(
        @InjectRepository(Chat) private chatRespository: Repository<Chat>,
        private dataSource: DataSource
    ) {}

    async where(where, relations = {}): Promise<Chat[]> {
        return await this.chatRespository.find({
            where,
            relations
        });
    }

    async whereOne(where, relations = {}): Promise<Chat> {
        return await this.chatRespository.findOne({
            where,
            relations
        });
    }

    async create(fields) {
        const dsResult = await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(Chat)
            .values([fields])
            .execute();
        console.log(dsResult)
        return dsResult;
    }

    async delete(id: number) {
        //
    }
}