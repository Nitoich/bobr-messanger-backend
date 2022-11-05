import {UserDtoMock} from "../dtos/user.mock";

export const UserRepositoryMock = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(user => Promise.resolve({
        id: Date.now(),
        ...user
    })),
    find: jest.fn().mockImplementation(() => Promise.resolve({})),
    delete: jest.fn().mockImplementation((id) => Promise.resolve({
        id,
        ...UserDtoMock
    })),
    findOneBy: jest.fn().mockImplementation((where) => Promise.resolve({
        id: where.id,
        ...UserDtoMock
    }))
};