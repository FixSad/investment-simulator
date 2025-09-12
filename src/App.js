import React from 'react';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Register/Login';
import Lk from './pages/Lk/Lk';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './components/ToastMessage/NotificationProvider';
import P2P from './pages/P2P/p2p';

const App = () => {
    return (
        <NotificationProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} /> 
                    <Route path="/register" element={<Register />} /> 
                    <Route path="/login" element={<Login />} />
                    <Route path="/lk" element={<Lk />} />
                    <Route path="/p2p" element={<P2P />}/>
                </Routes>
            </Router>
        </NotificationProvider>
    );
};

export default App;