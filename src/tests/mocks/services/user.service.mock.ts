import {UserDtoMock} from "../dtos/user.mock";


export const UserServiceMock = {
    findOne: jest.fn().mockImplementation((userId) => Promise.resolve({
        id: userId,
        ...UserDtoMock
    }))
};