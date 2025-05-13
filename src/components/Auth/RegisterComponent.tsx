import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_SERVICE_URL } from '../../config.ts';
import * as React from 'react';
import '../../styles/Auth/AuthForm.css';
import {validateNickname, validateEmail, validatePassword} from '../../utils/validators.ts';

const RegisterComponent = () => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [activeField, setActiveField] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateNickname(nickname)) {
            setError('Неправильний формат нікнейму.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Неправильний формат імейлу.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Неправильний формат паролю.');
            return;
        }

        try {
            const response = await fetch(`${USER_SERVICE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nickname, email, password}),
            });

            if (response.status === 400) {
                setError('Некоректні дані. Перевірте введену інформацію.');
                return;
            }

            if (response.status === 409) {
                setError('Користувач з таким імейлом або нікнеймом вже існує.');
                return;
            }

            if (!response.ok) {
                throw new Error('Помилка реєстрації.');
            }

            const data = await response.json();
            if (data.token && data.userId) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                navigate('/');
            } else {
                throw new Error('У відповді на реєстрацію немає токену та Id користувача.');
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Виникла незнайома помилка.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <input
                type="text"
                placeholder="Нікнейм"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onFocus={() => setActiveField('nickname')}
                onBlur={() => setActiveField(null)}
                required
                className="login-input"
            />
            {activeField === 'nickname' && (
                <div className="field-helper">Нікнейм повинен складатися з 5-30 символів та містити тільки латинські літери і цифри.</div>
            )}
            <input
                type="email"
                placeholder="Імейл"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField(null)}
                required
                className="login-input"
            />
            {activeField === 'email' && (
                <div className="field-helper">Валідний формат імейлу, наприклад myemail@example.com</div>
            )}
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setActiveField('password')}
                onBlur={() => setActiveField(null)}
                required
                className="login-input"
            />
            {activeField === 'password' && (
                <div className="field-helper">Пароль повинен містити 8-30 символів, хоча б одну латинську літеру та одну цифру.</div>
            )}
            <button type="submit" className="login-button">
                Продовжити
            </button>
            {error && <div className="login-error">{error}</div>}
        </form>
    );
};

export default RegisterComponent;