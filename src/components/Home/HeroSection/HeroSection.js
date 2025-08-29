import React, { useContext } from 'react';
import './HeroSection.css';
import ScrollButton from '../ScrollButton/ScrollButton';
import { useNavigate } from 'react-router-dom'; 
import { NotificationContext } from '../../ToastMessage/NotificationProvider';


const HeroSection = ({ onScrollDown, isVisible }) => {
    const navigate = useNavigate(); 
    const { showNotification } = useContext(NotificationContext);

    const handleStartInvesting = () => {
        navigate('/register'); 
    };
    showNotification('Это тестовое уведомление!', 'danger');

    return (
        <section className={`hero ${isVisible ? '' : 'hidden'}`}>
            <div className="hero-content">
                <img src="/images/crypto1.png" alt="Wealth" className="hero-image" />
                <div className="hero-text">
                    <h1>TO RICH</h1>
                    <h2>IS TO INVEST</h2>
                </div>
            </div>
            <div className="hero-buttons">
                <button className="btn primary" onClick={handleStartInvesting}>Начать инвестировать</button>
                <button className="btn secondary">Узнать больше</button>
            </div>
            <ScrollButton direction="down" onClick={onScrollDown} />
        </section>
    );
};

export default HeroSection;