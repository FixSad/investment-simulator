import React, { useState } from 'react';
import './AddFundsModal.css';
import { AddFundsToPortfolio } from '../../../services/InternalServices/portfolioService';

const AddFundsModal = ({ isOpen, onClose }) => {
    const [usdtAmount, setUsdtAmount] = useState('');

    const handleClose = () => {
        onClose();
        setUsdtAmount('');
    };

    const handleAddFunds = async () => {
        try {
            const res = {
                funds: usdtAmount
            }
            const response = await AddFundsToPortfolio(res, localStorage.getItem('accessToken'));
            console.log(response);
        } catch (ex) {
            console.log("ERROR", ex);
        }
        
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={handleClose}>
                    &times;
                </button>
                <h2>Пополнить баланс</h2>
                <div className="modal-input-container">
                    <label htmlFor="usdt-amount">USDT</label>
                    <input
                        id="usdt-amount"
                        type="number"
                        value={usdtAmount}
                        onChange={(e) => setUsdtAmount(e.target.value)}
                        placeholder="Введите сумму"
                    />
                </div>
                <div className="modal-buttons">
                    <button className="modal-button cancel" onClick={handleClose}>
                        Закрыть
                    </button>
                    <button className="modal-button confirm" onClick={handleAddFunds}>
                        Пополнить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddFundsModal; 