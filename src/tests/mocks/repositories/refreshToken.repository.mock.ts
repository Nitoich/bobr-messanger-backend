export const RefreshTokenRepositoryMock = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((dto) => Promise.resolve({
        id: Date.now(),
        ...dto
    })),
};