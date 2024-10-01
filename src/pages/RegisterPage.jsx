import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Popup from '../others/Popup.jsx';
import api from '../services/api.js';
import { useCookies } from 'react-cookie';
import { useDarkMode } from '../context/DarkModeContext';
import { Switch } from '@headlessui/react';

function RegisterPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        first_name: '',
        last_name: '',
        profile_picture: null
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tosAccepted, setTosAccepted] = useState(false);
    const [, setCookie] = useCookies(['token']);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profile_picture') {
            setFormData({ ...formData, profile_picture: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        if (!formData.email || !formData.password || !formData.username) {
            setError('Tous les champs sont obligatoires');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères');
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            setError('Adresse email invalide');
            return false;
        }
        if (!tosAccepted) {
            setError('Vous devez accepter les conditions d\'utilisation');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) return;

        setLoading(true);

        const data = new FormData();
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('username', formData.username);
        data.append('first_name', formData.first_name);
        data.append('last_name', formData.last_name);
        if (formData.profile_picture) {
            data.append('profile_picture', formData.profile_picture);
        }

        try {
            const response = await api.post('/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const { token } = response.data;
            setCookie('token', token, { path: '/' });
            navigate('/');
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setError(err.response.data.errors.map(e => e.msg).join(', '));
            } else {
                setError('Erreur lors de l\'inscription');
            }
        } finally {
            setLoading(false);
        }
    };

    const closePopup = () => {
        setError(null);
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
            {error && <Popup message={error} onClose={closePopup} />}
            <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'dark:bg-gray-900' : 'bg-gray-100'} w-full`}>
                <div className={`m-2 bg-white dark:bg-gray-800 w-full max-w-md p-8 pb-0 rounded-lg shadow-md`}>
                    <header className="flex justify-between items-center mb-2">
                        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Inscription</h1>
                        <div className="ml-5 flex items-center">
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

                    <section className="pt-2 pr-4 pl-4 pb-4">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email"
                                       className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email:</label>
                                <input
                                    name="email"
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    aria-required="true"
                                    autoComplete="email"
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500' : ''}`}
                                />
                            </div>
                            <div>
                                <label htmlFor="username"
                                       className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nom
                                    d'utilisateur:</label>
                                <input
                                    name="username"
                                    id="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    aria-required="true"
                                    autoComplete="username"
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500' : ''}`}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Mot de passe:</label>
                                <input
                                    name="password"
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    aria-required="true"
                                    autoComplete="new-password"
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500' : ''}`}
                                />
                            </div>
                            <div>
                                <label htmlFor="first_name" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Prénom:</label>
                                <input
                                    name="first_name"
                                    id="first_name"
                                    type="text"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    autoComplete="given-name"
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500' : ''}`}
                                />
                            </div>
                            <div>
                                <label htmlFor="last_name" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nom:</label>
                                <input
                                    name="last_name"
                                    id="last_name"
                                    type="text"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    autoComplete="family-name"
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500' : ''}`}
                                />
                            </div>
                            <div>
                                <label htmlFor="profile_picture" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Photo de profil:</label>
                                <input
                                    name="profile_picture"
                                    id="profile_picture"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600' : ''}`}
                                />
                            </div>
                            <fieldset>
                                <div className="flex items-start">
                                    <input
                                        id="accept"
                                        type="checkbox"
                                        checked={tosAccepted}
                                        onChange={(e) => setTosAccepted(e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="accept" className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Accepter les <Link className="underline text-blue-600 dark:text-blue-400" to="/login">conditions d'utilisation</Link>.
                                    </label>
                                </div>
                            </fieldset>
                            <div className="flex flex-col gap-4">
                                <button
                                    type="submit"
                                    disabled={!tosAccepted || loading}
                                    className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md transition-all ${tosAccepted && !loading ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 cursor-not-allowed text-gray-500'}`}
                                >
                                    {loading ? 'Chargement...' : "S'inscrire"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;
