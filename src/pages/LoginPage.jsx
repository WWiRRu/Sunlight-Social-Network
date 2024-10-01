import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useUser } from '../context/UserContext';
import { useDarkMode } from '../context/DarkModeContext';
import Popup from '../others/Popup';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const { setUser } = useUser();
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        try {
            const response = await api.post('/login', { email, password });
            const token = response.data.token;

            if (!token) {
                throw new Error('Token not received');
            }

            setCookie('token', token, { path: '/' });
            setCookie('user', JSON.stringify(response.data.user), { path: '/' });
            setUser(response.data.user);
            navigate("/");
        } catch (error) {
            setErrorMessage('Échec de la connexion. Veuillez vérifier vos identifiants.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={`flex flex-col justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900 text-cerise-800' : 'bg-white text-cerise-200'}`}>
                <div className={`w-12 h-12 border-4 border-t-transparent border-cerise rounded-full animate-spin mb-4`}></div>
                <p className={`${isDarkMode ? 'text-cerise-800' : 'text-cerise-200'}`}>Chargement en cours...</p>
            </div>
        );
    }

    return (
        <>
            {errorMessage && <Popup message={errorMessage} onClose={() => setErrorMessage('')} />}
            <div className={`${isDarkMode ? "bg-gray-900" : "bg-gray-200"} flex items-center justify-center min-h-screen`}>
                <div className={`${isDarkMode ? "bg-gray-800" : "bg-gray-100"} w-full max-w-md p-8 rounded-lg shadow-md`}>
                    <header className="flex justify-between items-center mb-6">
                        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Connexion</h1>
                        <div className="flex items-center">
                            <div className="flex flex-col max-w-full">
                                <input type="checkbox" name="light-switch" className="sr-only"/>
                                <label className="relative cursor-pointer p-2 m-auto" htmlFor="light-switch"
                                       onClick={toggleDarkMode}>
                                    <svg className={!isDarkMode ? "hidden" : ""} width="16" height="16"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path className="fill-slate-300"
                                              d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"/>
                                        <path className="fill-slate-400"
                                              d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"/>
                                    </svg>
                                    <svg className={`${isDarkMode ? "hidden" : "block"}`} width="16" height="16"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path className="fill-slate-400"
                                              d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"/>
                                        <path className="fill-slate-500"
                                              d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"/>
                                    </svg>
                                    <span className="sr-only">Changer de mode Darkmode / Lightmode</span>
                                </label>
                            </div>
                        </div>
                    </header>

                    <section className="p-6">
                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email"
                                       className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email:</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full px-4 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Mot
                                    de passe:</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full px-4 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <button
                                    type="submit"
                                    className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md transition-all bg-blue-500 hover:bg-blue-600 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                    disabled={loading}
                                >
                                    {loading ? "Chargement..." : "Se connecter"}
                                </button>
                                <div className="text-center">
                                    <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Pas encore inscrit ?</p>
                                    <button
                                        type="button"
                                        className={`py-2 px-4 bg-gray-500 font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 ${isDarkMode ? 'text-gray-200' : 'text-gray-300'}`}
                                        onClick={() => navigate("/register")}
                                    >
                                        S'inscrire
                                    </button>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
