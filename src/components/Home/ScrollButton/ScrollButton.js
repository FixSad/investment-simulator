import React from 'react';
import './ScrollButton.css';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const ScrollButton = ({ direction, onClick }) => {
    const Icon = direction === 'down' ? KeyboardDoubleArrowDownIcon : KeyboardDoubleArrowUpIcon;

    return (
        <button className={`scroll-${direction}-btn`} onClick={onClick}>
            <Icon fontSize="large" />
        </button>
    );
};

export default ScrollButton;