import { internalApi}  from "../api";

export const getAllPortfolio = async () => {
    try {
        const response = await internalApi.get('/portfolio/all');
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении списка портфолио", error);
        throw error;
    }
}

export const createPortfolio = async (symbol, quantity) => {
    try {
        const response = await internalApi.post('/portfolio', {symbol, quantity});
        return response.data;
    } catch (error) {
        console.error(`Ошибка при создании портфолио ${symbol}`, error);
        throw error;
    }
}

export const deletePortfolio = async (id) => {
    try {
        const response = await internalApi.delete(`/portfolio/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при удалении портфолио с ID ${id}`, error);
        throw error;
    }
}

export const getPortfolio = async (id) => {
    try {
        const response = await internalApi.post(`/portfolio/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении портфолио с ID ${id}`, error);
        throw error;
    }
}

export const AddFundsToPortfolio = async (funds, accessToken) => {
    try {
        console.log(accessToken);
        const response = await internalApi.post(`/portfolio/addFunds`, funds, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Ошибка при пополнении баланса на ${funds}`, error);
        throw error;
    }
}

