import { internalApi } from '../api';

export const getAllFavourites = async () => {
    try {
        const response = await internalApi.get('/favourite/all');
        return response;
    } catch (error) {
        console.error('Ошибка при получении cписка избранного', error);
        throw error;
    }
};

export const createFavourite = async (symbol) => {
    try {
        const response = await internalApi.post('/favourite', { symbol });
        return response;
    } catch (error) {
        console.error(`Ошибка при создании избранного ${symbol}`, error);
        throw error;
    }
};

export const deleteFavourite = async (id) => {
    try {
        const response = await internalApi.delete(`/favourite/${id}`);
        return response;
    } catch (error) {
        console.error(`Ошибка при удалении избранного с ID ${id}`, error);
        throw error;
    }
};

export const getFavourite = async (id) => {
    try{
        const response = await internalApi.get(`/favourite/${id}`);
        return response;
    } catch (error) {
        console.error(`Ошибка при получении избранного с ID ${id}`, error);
        throw error;
    }
}