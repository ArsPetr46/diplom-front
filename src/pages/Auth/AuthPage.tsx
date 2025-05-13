import { useState } from 'react';
import LoginComponent from '../../components/Auth/LoginComponent.tsx';
import RegisterComponent from '../../components/Auth/RegisterComponent.tsx';
import '../../styles/Auth/Auth.css';

const AuthPage = () => {
    const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-buttons">
                    <button
                        onClick={() => setActiveForm('login')}
                        disabled={activeForm === 'login'}
                        className={activeForm === 'login' ? 'disabled' : ''}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setActiveForm('register')}
                        disabled={activeForm === 'register'}
                        className={activeForm === 'register' ? 'disabled' : ''}
                    >
                        Register
                    </button>
                </div>
                <div className="auth-form">
                    {activeForm === 'login' && <LoginComponent />}
                    {activeForm === 'register' && <RegisterComponent />}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;