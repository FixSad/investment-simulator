import React from 'react';
import './InfoSection.css';
import ScrollButton from '../ScrollButton/ScrollButton';

const InfoSection = ({ onScrollUp, isVisible }) => {
    return (
        <section className={`info ${isVisible ? 'visible' : ''}`}>
            <h3>О нашем сервисе</h3>
            <p>
                Наш сервис поможет вам начать инвестировать и достигать финансовых целей.
            </p>
            <ScrollButton direction="up" onClick={onScrollUp} />
        </section>
    );
};

export default InfoSection;