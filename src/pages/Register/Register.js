import React from 'react';
import './Register.css';

const Register = () => {
    return (
        <div className="register-page">
            <h1>Регистрация</h1>
            <form>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Введите email" required />

                <label htmlFor="password">Пароль:</label>
                <input type="password" id="password" placeholder="Введите пароль" required />

                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Register;