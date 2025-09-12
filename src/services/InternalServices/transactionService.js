import { internalApi } from "../api";

export const getAllTransactions = async () => {
    try {
        const response = await internalApi.get('/transaction/all');
        return response;
    } catch (error) {
        console.error(`Ошибка при получении списка транзакций`, error);
        throw error;
    }
}

export const createTransaction = async (symbol, quantity, type, price) => {
    try {
        const response = await internalApi.post('/transaction', {symbol, quantity, type, price});
        return response;        
    } catch (error) {
        console.error(`Ошибка при создании транзакции ${symbol}`, error);
        throw error;
    }
}

export const deleteTransaction = async (id) => {
    try {
        const response = await internalApi.delete(`/transaction/${id}`);
        return response;
    } catch (error) {
        console.error(`Ошибка при удалении транзакции с ID ${id}`, error);
        throw error;
    }
}

export const getTransaction = async (id) => {
    try {
        const response = await internalApi.get(`/transaction/${id}`);
        return response;
    } catch (error) {
        console.error(`Ошибка при получении транзакции с ID ${id}`, error);
        throw error;
    }
}