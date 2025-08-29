import React, { useState } from 'react';
import './Register.css';
import { loginUser } from '../../services/InternalServices/authService';

const Login = () => {
    const [password, setPassword] = useState("");
    const [username, setLogin] = useState("");

    const [usernameErrorVisible, setUsernameErrorVisible] = useState(true);

    const [passwordErrorVisible, setPasswordErrorVisible] = useState(true);

    const validate = () => {
        let flag = {email: false, username: false};

        if (password.length <= 0) {
            flag.password = false;
            setPasswordErrorVisible(false);
        } else {
            flag.password = true;
            setPasswordErrorVisible(true);
        }

        if (username.length <= 0) {
            flag.username = false;
            setUsernameErrorVisible(false);
        } else {
            flag.username = true;
            setUsernameErrorVisible(true);
        }

        return flag;
    }

    const submitRegistration = async (e) => {
        e.preventDefault();

        const result = validate();

        if (result.username && result.password) {
            try {
                const data = {
                    username,
                    password
                };

                const response = await loginUser(data);

                console.log("response - ", response);
            } catch (ex) {
                console.error(ex); 
                alert(`Ошибка: ${ex.message || "Не удалось войти. Попробуйте позже."}`);
            }
        }
    };

    const handleInputChange = (e) => {
        if (e.target.id === "username") setLogin(e.target.value);
        else if (e.target.id === "password") setPassword(e.target.value);
    }

    const hideError = (field) => {
        if (field === "username") setUsernameErrorVisible(true);
        else if (field === "password") setPasswordErrorVisible(true);
    }

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="form-section">
                    <h1>Вход</h1>
                    <form>
                        <label htmlFor="username">Имя пользователя:</label>
                        <input type="text" id="username"
                               onChange={handleInputChange}
                               placeholder="Введите имя пользователя"
                               required />
                        <h6 className='validateErrorText'
                            hidden={usernameErrorVisible}
                            onClick={() => hideError("username")}>
                                Имя пользователя обязательно к заполнению
                        </h6>

                        <label htmlFor="password">Пароль:</label>
                        <input type="password" id="password"
                               onChange={handleInputChange}
                               placeholder="Введите пароль"
                               required />
                        <h6 className='validateErrorText'
                            hidden={passwordErrorVisible}
                            onClick={() => hideError("password")}>
                                Пароль обязателен к заполнению
                        </h6>

                        <button onClick={submitRegistration} type="submit">Войти</button>
                    </form>
                    <div className="auth-button">
                        <a href="/register">Нет аккаунта? Зарегистрироваться</a>
                    </div>
                </div>

                <div className="image-section">
                    <img src="/images/login.png" alt="log png" />
                </div>
            </div>
        </div>
    );
};

export default Login;