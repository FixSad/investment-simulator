import React, { useState, useEffect } from 'react';
import './App.css';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'; 

const App = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('wheel', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleScroll);
        };
    }, []);

    const scrollToSection = () => {
        const infoSection = document.querySelector('.info');
        if (infoSection) {
            infoSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="app">
            <header className={`site-header ${isScrolled ? 'visible' : ''}`}>
                <h3>Investment Simulator</h3>
            </header>

            <section className={`hero ${isScrolled ? 'hidden' : ''}`}>
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

                <button className="scroll-down-btn" onClick={scrollToSection}>
                    <KeyboardDoubleArrowDownIcon fontSize="large" /> 
                </button>
            </section>

            <section className={`info ${isScrolled ? 'visible' : ''}`}>
                <h3>О нашем сервисе</h3>
                <p>
                    Наш сервис поможет вам начать инвестировать и достигать финансовых целей. Мы предлагаем удобные
                    инструменты для анализа рынка, управления портфелем и принятия решений.
                </p>
                <p>
                    Присоединяйтесь к тысячам пользователей, которые уже используют нашу платформу для создания
                    стабильного пассивного дохода.
                </p>
                <p>
                    Мы стремимся сделать инвестирование доступным каждому, независимо от уровня опыта. Начните прямо
                    сейчас!
                </p>
                <p>
                    Для новичков мы подготовили подробные руководства и обучающие материалы, чтобы вы могли уверенно
                    начать свой путь в мире инвестиций.
                </p>
                <p>
                    Если у вас есть вопросы, свяжитесь с нашей службой поддержки. Мы всегда готовы помочь!
                </p>
            </section>
        </div>
    );
};

export default App;