import React from 'react';
import './Header.css';

const Header = ({ isVisible }) => {
    return (
        <header className={`site-header ${isVisible ? 'visible' : ''}`}>
            <h3>Investment Simulator</h3>
        </header>
    );
};

export default Header;