import React from 'react';
import './HeroSection.css';
import ScrollButton from '../ScrollButton/ScrollButton';

const HeroSection = ({ onScrollDown, isVisible }) => {
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
                <button className="btn primary">Начать инвестировать</button>
                <button className="btn secondary">Узнать больше</button>
            </div>
            <ScrollButton direction="down" onClick={onScrollDown} />
        </section>
    );
};

export default HeroSection;