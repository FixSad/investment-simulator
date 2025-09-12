import React, { useContext, useState, useEffect } from 'react';
import './Lk.css';
import '../../components/Header/Header.css';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../../components/ToastMessage/NotificationProvider';
import { getUserInfo } from '../../services/InternalServices/authService';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import AddFundsModal from '../../components/Lk/AddFundsModal/AddFundsModal';
import { GetBinancePairPrice } from '../../services/ExternalServices/binanceService';

const Lk = () => {
    const navigate = useNavigate();
    const { showNotification } = useContext(NotificationContext);
    const [userInfo, setUserInfo] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pairPrices, setPairPrices] = useState({});

    const getPairPrice = async () => {
        if (!userInfo?.favourites?.$values) return;

        const updatedPrices = {}; 

        for (const pair of userInfo.favourites.$values) {
            try {
                const response = await GetBinancePairPrice(pair.symbol);
                const truePrice = parseFloat(response.data.price).toString();
                const symbol = response.data.symbol;
                updatedPrices[symbol] = truePrice; 
            } catch (ex) {
                console.error(`Ошибка при получении цены для ${pair.symbol}:`, ex.message);
            }
        }

        setPairPrices(updatedPrices);
    };

    useEffect(() => {
        let isMounted = true;

        const fetchUserInfo = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                if (isMounted) {
                    navigate('/');
                }
                return;
            }

            try {
                const response = await getUserInfo(accessToken);
                if (isMounted && response.status === 200) {
                    setUserInfo(response.data);
                    getPairPrice(response.data.favourites);
                }
            } catch (ex) {
                if (isMounted) {
                    if (ex.response && ex.response.status === 401) {
                        showNotification('Сессия истекла. Пожалуйста, войдите снова.');
                    } else {
                        showNotification(ex.response?.data?.description || 'Произошла ошибка при загрузке данных.');
                        console.error('Ошибка при получении информации о пользователе:', ex);
                    }
                }
                navigate('/login');
            }
        };

        fetchUserInfo();

        return () => {
            isMounted = false;
        };
    }, [navigate, showNotification]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken'); 
        navigate('/'); 
    };

    useEffect(() => {
        if (userInfo?.favourites?.$values) {
            getPairPrice(); 
        }
    }, [userInfo]);

    return (
        <>
            <header className={`site-header visible`}>
                <div className="header-content">
                    <h3>Investment Simulator</h3>
                    <PersonIcon className="person-icon" />
                    {userInfo && <span className="username">{userInfo.username}</span>}
                </div>

                {/* Дропдаун */}
                <div className="dropdown-container">
                    <button
                        className="dropdown-toggle"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {userInfo?.email}
                    </button>

                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <p>
                                Зарегистрирован: {userInfo && new Date(userInfo.timestamp).toLocaleDateString('ru-RU')}
                            </p>
                            <button className="logout-button" onClick={handleLogout}>
                                Выйти
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <div className="lk-container">
                {/* Блок Портфолио */}
                <div className="card portfolio-card-top-left">
                    <div className="portfolio-header">
                        <h2>Портфолио</h2>
                        <span className="separator">|</span>
                        <div className="add-funds-container">
                            <span className="add-funds-text">Пополнить</span>
                            <button className="add-funds-button" onClick={() => setIsModalOpen(true)}>
                                <AddIcon />
                            </button>
                        </div>
                    </div>

                    {userInfo?.portfolios?.$values?.length > 0 ? (
                        userInfo.portfolios.$values.map((portfolio, index) => (
                            <div key={index} className="portfolio-item">
                                <p>{portfolio.symbol}: {portfolio.quantity}</p>
                            </div>
                        ))
                    ) : (
                        <p>Портфолио пусто.</p>
                    )}
                </div>

                {/* Блок Транзакций */}
                <div className="card transactions-card">
                    <h2>Транзакции</h2>
                    {userInfo?.transactions?.$values?.length > 0 ? (
                        userInfo.transactions.$values.map((transaction, index) => (
                            <div key={index} className="transaction-item">
                                <p>{transaction.type}: {transaction.amount} {transaction.currency}</p>
                            </div>
                        ))
                    ) : (
                        <p>Транзакций нет.</p>
                    )}
                </div>

                {/* Блок Любимых пар */}
                <div className="card favorites-card">
                    <h2>Любимые пары</h2>
                    {userInfo?.favourites?.$values.length > 0 ? (
                        userInfo.favourites.$values.map((pair, index) => {
                            const symbol = pair.symbol;
                            const price = pairPrices[symbol] || 'Загрузка...'; 

                            return (
                                <div key={index} className="favorite-item">
                                    <p>{symbol}: {price}</p>
                                </div>
                            );
                        })
                    ) : (
                        <p>Нет любимых пар.</p>
                    )}
                </div>

                {/* Модальное окно */}
                <AddFundsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </>
    );
};

export default Lk;