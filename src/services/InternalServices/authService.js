import { internalApi } from '../api';

export const createUser = async (user) => {
    try {
        const response = await internalApi.post('/auth/register', user);
        return response;
    } catch (error) {
        console.error('Ошибка при создании пользователя', error);
        throw error;
    }
};

export const loginUser = async (user) => {
    try {
        const response = await internalApi.post('/auth/login', user);
        return response.data;
    } catch (error) {
        console.error('Ошибка при входе в аккаунт', error);
        throw error;
    }
};