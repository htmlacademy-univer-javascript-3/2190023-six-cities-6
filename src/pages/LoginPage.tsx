import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/login-thunk';
import type { AppDispatch, RootState } from '../store';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router';
import { AuthorizationStatus } from '../store/auth-slice';

export const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const authorizationStatus = useSelector((state: RootState) => state.auth.authorizationStatus);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await dispatch(login({ email, password })).unwrap();
            navigate('/');
        } catch (err: any) {
            setError(err);
        }
    };

    if (authorizationStatus === AuthorizationStatus.Authorized) {
        navigate('/');
        return null;
    }

    return (
        <>
            <Header />
            <div className="page page--gray page--login">
                <main className="page__main page__main--login">
                    <div className="container">
                        <section className="login">
                            <h1 className="login__title">Sign in</h1>
                            <form className="login__form form" onSubmit={handleSubmit}>
                                <div className="login__input-wrapper form__input-wrapper">
                                    <label>
                                        E-mail
                                        <input
                                            className="login__input form__input"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className="login__input-wrapper form__input-wrapper">
                                    <label>
                                        Password
                                        <input
                                            className="login__input form__input"
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                                {error && <div className="login__error">{error}</div>}
                                <button className="login__submit form__submit button" type="submit">
                                    Sign in
                                </button>
                            </form>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
};