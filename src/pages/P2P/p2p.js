import React, { useState, useEffect } from "react";
import { GetBinanceOrderBook } from "../../services/ExternalServices/binanceService";
import "./p2p.css";

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
      const symbol = `${asset}${fiat}`;
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

  const totalCost = selectedOffer ? (amount * selectedOffer.price).toFixed(2) : 0;

  return (
    <div className="p2p-page">

      <div className="p2p-left">
        <h1>P2P Криптообмен</h1>

        <div className="p2p-selects">
          <div className="p2p-group">
            <label>Криптовалюта</label>
            <select value={asset} onChange={(e) => setAsset(e.target.value)}>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
            </select>
          </div>

          <div className="p2p-group">
            <label>Фиат</label>
            <select value={fiat} onChange={(e) => setFiat(e.target.value)}>
              <option value="USDT">USDT</option>
              <option value="EUR">EUR</option>
              <option value="RUB">RUB</option>
            </select>
          </div>
        </div>

        <h2>Доступные предложения</h2>
        <div className="offers">
          {offers.length > 0 ? (
            offers.map((offer) => (
              <div key={offer.id} className="offer-card">
                <div className="offer-info">
                  <h3>{offer.sellerName}</h3>
                  <p>Цена: {offer.price} {fiat}</p>
                  <p>Количество: {offer.amount} {asset}</p>
                </div>
                <button onClick={() => setSelectedOffer(offer)}>Выбрать</button>
              </div>
            ))
          ) : (
            <p className="empty">Нет доступных предложений</p>
          )}
        </div>
      </div>

      <div className="p2p-right">
        {selectedOffer ? (
          <div className="selected-offer">
            <h2>Выбранное предложение</h2>
            <p>
              {selectedOffer.sellerName} — {selectedOffer.price} {fiat} за {asset}
            </p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Введите сумму"
            />
            <p>Итоговая стоимость: {totalCost} {fiat}</p>
            <button className="buy">Купить</button>
          </div>
        ) : (
          <div className="selected-offer placeholder">
            <p>Выберите предложение 👈</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default P2P;
