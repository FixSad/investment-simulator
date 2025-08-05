import { externalApi } from "../api";

export const GetAllBinancePairs = async () => {
    try {
        const response = await externalApi.get('/exchangeInfo');
        return response.data;
    } catch (error) {
        console.error('[Бинанс] Ошибка при получении списка торговых пар', error);
        throw error;
    }
}

export const GetBinancePairPrice = async (symbol) => {
    try {
        const response = await externalApi.get(`/ticker/price?symbol=${symbol}`);
        return response.data;
    } catch (error) {
        console.error(`[Бинанс] Ошибка при получении цен пары ${symbol}`, error);
        throw error;
    }
}

export const GetBinanceOrderBook = async (symbol) => {
    try {
        const response = await externalApi.get(`/depth?symbol=${symbol}&limit=10`);
        return response.data;
    } catch (error) {
        console.error(`[Бинанс] Ошибка при получении книги ордеров ${symbol}`, error);
        throw error;
    }
}

export const GetBinanceTradingVolume = async (symbol) => {
    try {
        const response = await externalApi.get(`/ticker/24hr?symbol=${symbol}`);
        return response.data;
    } catch (error) {
        console.error(`[Бинанс] Ошибка при получении объема торгов ${symbol}`, error);
        throw error;
    }
}

export const GetBinanceCandlestick = async (symbol) => {
    try {
        const response = await externalApi.get(`/klines?symbol=${symbol}&interval=1h`);
        return response.data;
    } catch (error) {
        console.error(`[Бинанс] Ошибка при получении свечей ${symbol}`, error);
        throw error;
    }
}