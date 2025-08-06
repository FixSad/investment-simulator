// pages/Home.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import HeroSection from '../components/Home/HeroSection/HeroSection';
import InfoSection from '../components/Home/InfoSection/InfoSection';

const Home = () => {
    const [isSecondSectionVisible, setIsSecondSectionVisible] = useState(false);

    const showSecondSection = () => {
        setIsSecondSectionVisible(true);
    };

    const showFirstSection = () => {
        setIsSecondSectionVisible(false);
    };

    useEffect(() => {
        const handleScroll = (event) => {
            const delta = event.deltaY; 

            if (delta > 0 && !isSecondSectionVisible) {
                showSecondSection();
            } else if (delta < 0 && isSecondSectionVisible) {
                showFirstSection();
            }
        };

        window.addEventListener('wheel', handleScroll);
        return () => window.removeEventListener('wheel', handleScroll);
    }, [isSecondSectionVisible]);

    return (
        <>
            <Header isVisible={isSecondSectionVisible} />
            <HeroSection onScrollDown={showSecondSection} isVisible={!isSecondSectionVisible} />
            <InfoSection onScrollUp={showFirstSection} isVisible={isSecondSectionVisible} />
        </>
    );
};

export default Home;