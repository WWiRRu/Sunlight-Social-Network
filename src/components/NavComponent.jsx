import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import clsx from "clsx";
import api from "../services/api.js";
import { useDarkMode } from "../context/DarkModeContext";
import {useUser} from "../context/UserContext.jsx";

const NavModule = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [cookies, setCookie] = useCookies(['token']);
    const {isDarkMode ,toggleDarkMode} = useDarkMode();
    const navigate = useNavigate();
    const location = useLocation();
    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setError(null);
        if (value.trim().length < 2) {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        setLoading(true);
        try {
            const response = await api.get('/search-users', {
                headers: { Authorization: `Bearer ${cookies.token}` },
                params: { searchTerm: value },
            });
            setSearchResults(response.data);
            setShowSearchResults(true);
        } catch (err) {
            setError('Erreur lors de la recherche d\'utilisateurs.');
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };


    const handleSearchResultClick = (userId) => {
        navigate(`/profile/${userId}`);
        setSearchTerm("");
        setSearchResults([]);
        setShowSearchResults(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        setCookie('token', '', { path: '/' });
        navigate('/login');
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            if (!document.activeElement.matches('input')) {
                setShowSearchResults(false);
            }
        }, 200);
    };

    const isActive = (path) => {
        return location.pathname === path ? `${isDarkMode ? "bg-gray-700" : "bg-gray-400"}` : "";
    };
    return (
        <>
            <nav className={`transition-colors ${isDarkMode ? "bg-gray-950 text-black-900" : "bg-white text-white-100"} border-b border-gray-200 inset-x-0 top-0 fixed flex items-center justify-between h-20 md:h-16 px-4`}>
                <div className="flex gap-4 items-center">
                    <button id="burger-button" onClick={toggleMenu}>
                        <svg
                            className="h-6 w-6 hover:text-gray-700 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher un utilisateur..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={() => setShowSearchResults(true)}
                            onBlur={handleInputBlur}
                            className={`placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm transition-colors ${isDarkMode ?  "bg-gray-950 text-black-900" : "bg-white text-white-100"}`}
                        />
                        {showSearchResults && searchResults.length > 0 && (
                            <ul className={`absolute max-w-md w-full border border-gray-200 rounded-md shadow-lg mt-1 z-10 transition-colors ${isDarkMode ? "bg-gray-950 text-black-900" : "bg-white text-white-100"}`}>
                                {searchResults.map((user) => (
                                    <li
                                        key={user.id}
                                        onClick={() => handleSearchResultClick(user.id)}
                                        className={`max-w-md w-full cursor-pointer px-2 py-2 transition-colors ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} border-b border-gray-500 last:border-none transition-all`}
                                    >
                                        <p className={`text-sm md:text-base transition-colors ${isDarkMode ? "text-black-900" : "text-white-100"}`}>{user.username}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {showSearchResults && searchResults.length === 0 && !loading && (
                            <p className={`absolute max-w-md w-full border transition-colors ${isDarkMode ? "bg-gray-950 text-black-900" : "bg-white text-white-100"} border-gray-700 rounded-md shadow-lg mt-1 z-10 text-sm px-4 py-2`}>
                                Aucun utilisateur trouvé.
                            </p>
                        )}
                        {error && (
                            <p className="absolute max-w-md w-full bg-red-100 border border-red-500 rounded-md shadow-lg mt-1 z-10 text-sm px-4 py-2 text-red-500">
                                {error}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-center" onClick={() => navigate(`/profile/${user?.id}`)}>
                    {user?.profile_picture ? (
                        <img
                            src={`/profile-picture/${user.profile_picture}`}
                            alt="User Profile"
                            className="w-8 h-8 rounded-full mb-1 cursor-pointer"
                        />
                    ) : (
                        <img className="w-8 h-8 rounded-full mb-1 cursor-pointer"
                             src="../assets/default_image.png" alt="Default user image"/>
                    )}
                    <span className="username">{user?.username}</span>
                </div>
            </nav>

            <div
                className={clsx(
                    `fixed inset-y-0 left-0 transform w-64 shadow-lg transition-transform duration-300 ease-in-out z-50 ${isDarkMode ? "bg-gray-950 text-black-900" : "bg-white text-white-100"}`,
                    { "translate-x-0": menuOpen, "-translate-x-full": !menuOpen }
                )}
            >
                <button
                    onClick={toggleMenu}
                    className={`p-4 focus:outline-none ${isDarkMode ? "bg-gray-950 text-black-900 hover:text-gray-500" : "bg-white text-white-100"} `}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="grid">
                    <img className="grid h-10 w-10 m-auto rounded-lg text-xs text-gray-600" src={`./sunlight-logo.png`} alt="image of the social network" />
                    <p className={`text-center ${isDarkMode ? "text-black-900" : "text-white-100"}`}>Sunlight</p>
                </div>
                <div className={`flex h-screen flex-col justify-between border-e transition-colors ${isDarkMode ? "bg-gray-950" : "bg-white"}`}>
                    <div className="px-4 py-6 pt-0">
                        <ul className="mt-6 space-y-1">
                            <li>
                                <Link
                                    onClick={toggleMenu}
                                    to="/"
                                    className={`block rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isDarkMode ? "bg-gray-950 text-gray-100 hover:text-gray-700 hover:bg-gray-200" : "bg-white text-white-100 hover:bg-gray-200"} ${isActive("/")}`}
                                >
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary
                                        className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition-colors ${isDarkMode ? "bg-gray-950 text-gray-100 hover:text-gray-700 hover:bg-gray-200" : "bg-white text-white-100 hover:bg-gray-200"}`}
                                    >
                                        <span className="text-sm font-medium">Compte</span>
                                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <ul className="mt-2 space-y-1 px-4">
                                        <li>
                                            <Link
                                                onClick={toggleMenu}
                                                to={`/profile/${user?.id}`}
                                                className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition-colors ${isDarkMode ? "hover:bg-gray-700 hover:text-gray-200" : "hover:bg-gray-200 hover:text-gray-500"} ${isActive(`/profile/${user?.id}`)}`}
                                            >
                                                Profil
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                onClick={toggleMenu}
                                                to={`/settings`}
                                                className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition-colors ${isDarkMode ? "hover:bg-gray-700 hover:text-gray-200" : "hover:bg-gray-200 hover:text-gray-500"} ${isActive(`/dashboard`)}`}
                                            >
                                                Sécurité
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            {user?.isAdmin ? (
                                <li>
                                    <Link
                                        onClick={toggleMenu}
                                        to="/dashboard"
                                        className={`block rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isDarkMode ? "bg-gray-950 text-gray-100 hover:text-gray-700 hover:bg-gray-200" : "bg-white text-white-100 hover:bg-gray-200"} ${isActive("/dashboard")}`}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                            ) : null}
                        </ul>
                    </div>
                    <div className={`sticky inset-x-0 bottom-0 border-t transition-colors ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}>
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
                        <button
                            onClick={handleLogout}
                            className={`border-t transition-colors ${isDarkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-50"} group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:text-gray-500`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5 opacity-75"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                            </svg>
                            <span
                                className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                Se déconnecter
                            </span>
                        </button>
                        <Link onClick={toggleMenu} to={`/profile/${user?.id}`}
                              className={`border-t transition-colors ${isDarkMode ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"} flex items-center gap-2 p-4`}>
                            {user?.profile_picture ? (
                                <img
                                    src={`https://play.godmoon.fr:27205/api/profile-picture/${user.profile_picture}`}
                                    alt="User Profile"
                                    className={`w-8 h-8 rounded-full mb-1 cursor-pointer transition-colors ${isDarkMode ? "text-black-900" : "text-white-100"}`}
                                />
                            ) : (
                                <img className={`w-8 h-8 rounded-full mb-1 cursor-pointer transition-colors ${isDarkMode ? "text-black-900" : "text-white-100"}`}
                                     src="../assets/default_image.png" alt="Default user image"/>
                            )}
                            <div>
                                <p className="text-xs">
                                <strong className={`block font-medium ${isDarkMode ? "text-black-900" : "text-white-100"}`}>{user?.username || "Nom d'utilisateur"}</strong>
                                    <span className={isDarkMode ? "text-black-900" : "text-white-100"}>{user?.email || "Adresse e-mail"}</span>
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 text-lightmode transition-all"
                    onClick={toggleMenu}
                />
            )}
        </>
    );
};

export default NavModule;