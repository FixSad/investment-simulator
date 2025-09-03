import React, { useContext, useState } from 'react';
import './Register.css';
import { createUser } from '../../services/InternalServices/authService';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../../components/ToastMessage/NotificationProvider';

const Register = () => {
    const navigate = useNavigate();
    const { showNotification } = useContext(NotificationContext); 

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setLogin] = useState("");

    const [usernameErrorVisible, setUsernameErrorVisible] = useState(true);

    const [emailErrorVisible, setEmailErrorVisible] = useState(true);
    const [emailMessageText, setEmailMessageText] = useState("");

    const [passwordErrorVisible, setPasswordErrorVisible] = useState(true);

    const validate = () => {
        let flag = {email: false, username: false, password: false};

        if (email.length === 0) {
            setEmailMessageText("Почта обязательна к заполнению");
            setEmailErrorVisible(false);
            flag.email = false;
        } else if(EMAIL_REGEXP.test(email) === false) {
            flag.email = false;
            setEmailMessageText("Неверно указана почта");
            setEmailErrorVisible(false);
        } else {
            flag.email = true;
            setEmailErrorVisible(true);
        }

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

        if (result.email && result.username && result.password) {
            try {
                const data = {
                    username,
                    password,
                    email
                };

                const response = await createUser(data);
                
                if (response.status === 200){
                    navigate('/login');
                } else {
                    showNotification(response.description);
                }

                console.log("response - ", response);
            } catch (ex) {
                console.error(ex); 
                showNotification(`${ex.response?.data?.description || "Не удалось зарегистрироваться. Попробуйте позже."}`);
            }
        }
    };

    const handleInputChange = (e) => {
        if (e.target.id === "username") setLogin(e.target.value);
        else if (e.target.id === "email") setEmail(e.target.value);
        else if (e.target.id === "password") setPassword(e.target.value);
    }

    const hideError = (field) => {
        if (field === "email") setEmailErrorVisible(true);
        else if (field === "username") setUsernameErrorVisible(true);
        else if (field === "password") setPasswordErrorVisible(true);
    }

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="form-section">
                    <h1>Регистрация</h1>
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

                        <label htmlFor="email">Email:</label>
                        <input onChange={handleInputChange}
                               type="email" id="email"
                               placeholder="Введите email"
                               required />
                        <h6 className='validateErrorText'
                            hidden={emailErrorVisible}
                            onClick={() => hideError("email")}>
                                {emailMessageText}
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

                        <button onClick={submitRegistration} type="submit">Зарегистрироваться</button>
                    </form>
                    <div className="auth-button">
                        <a href="/login">Уже есть аккаунт? Авторизоваться</a>
                    </div>
                </div>

                <div className="image-section">
                    <img src="/images/registration.png" alt="reg png" />
                </div>
            </div>
        </div>
    );
};

export default Register;