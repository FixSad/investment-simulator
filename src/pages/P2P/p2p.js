import React, { useState, useEffect } from "react";
import { GetBinanceOrderBook } from "../../services/ExternalServices/binanceService";
import './p2p.css';

const P2P = () => {
  const [asset, setAsset] = useState("BTC"); 
  const [fiat, setFiat] = useState("USDT"); 
  const [amount, setAmount] = useState(""); 
  const [offers, setOffers] = useState([]); 
  const [selectedOffer, setSelectedOffer] = useState(null); 

  const generateRandomName = () => {
    const names = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"];
    return names[Math.floor(Math.random() * names.length)];
  };

  const fetchOrderBook = async () => {
    try {
      const symbol = `${asset}${fiat}`
      const response = await GetBinanceOrderBook(symbol);

      const data = response.data;

      const formattedOffers = data.asks.map((ask, index) => ({
        id: index + 1,
        sellerName: generateRandomName(),
        price: parseFloat(ask[0]), 
        amount: parseFloat(ask[1]), 
      }));

      setOffers(formattedOffers);
    } catch (error) {
      console.error("Ошибка при получении данных из Binance API:", error);
      setOffers([]);
    }
  };

  useEffect(() => {
    fetchOrderBook();
  }, [asset, fiat]);

  const handleAssetChange = (e) => {
    setAsset(e.target.value);
  };

  const handleFiatChange = (e) => {
    setFiat(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const totalCost = selectedOffer
    ? (amount * selectedOffer.price).toFixed(2)
    : 0;

  return (
    <div className="container">
      <h1>P2P Криптовалютный Обмен</h1>

      <div className="formGroup">
        <label>Выберите актив (криптовалюта):</label>
        <select value={asset} onChange={handleAssetChange} className="p2pInput">
          <option value="USDT">USDT</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </select>
      </div>

      <div className="formGroup">
        <label>Выберите фиат (валюта):</label>
        <select value={fiat} onChange={handleFiatChange} className="p2pInput">
          <option value="USDT">USDT</option>
          <option value="EUR">EUR</option>
          <option value="RUB">RUB</option>
        </select>
      </div>

      {/* Список заявок */}
      <h2>Доступные предложения:</h2>
      <table className="p2pInput">
        <thead>
          <tr>
            <th>Продавец</th>
            <th>Цена ({fiat})</th>
            <th>Количество ({asset})</th>
            <th>Выбрать</th>
          </tr>
        </thead>
        <tbody>
          {offers.length > 0 ? (
            offers.map((offer) => (
              <tr key={offer.id}>
                <td>{offer.sellerName}</td>
                <td>{offer.price}</td>
                <td>{offer.amount}</td>
                <td>
                  <button
                    onClick={() => setSelectedOffer(offer)}
                    className="selectButton"
                  >
                    Выбрать
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Нет доступных предложений</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedOffer && (
        <div className="formGroup">
          <h2>Выбранное предложение:</h2>
          <p>
            Продавец: {selectedOffer.sellerName}, Цена: {selectedOffer.price}{" "}
            {fiat}, Доступное количество: {selectedOffer.amount} {asset}
          </p>
          <label>Введите сумму для покупки:</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="p2pInput"
            placeholder="Введите сумму"
          />
          <p>Итоговая стоимость: {totalCost} {fiat}</p>
          <button className="p2pButton">Купить</button>
        </div>
      )}
    </div>
  );
};
export default P2P;