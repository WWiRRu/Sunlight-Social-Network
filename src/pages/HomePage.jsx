import React from 'react';
import { useDarkMode } from '../context/DarkModeContext.jsx';
import { useNavigation } from 'react-router-dom';
import {useUser} from "../context/UserContext.jsx";

const HomePage = () => {
    const { isDarkMode } = useDarkMode();
    const navigation = useNavigation();
    const {user} = useUser();
    if (navigation.state === 'loading') {
        return (
            <div className={`flex flex-col justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900 text-cerise-800' : 'bg-white text-cerise-200'}`}>
                <div className={`w-12 h-12 border-4 border-t-transparent border-cerise rounded-full animate-spin mb-4`}></div>
                <p className={`${isDarkMode ? 'text-cerise-800' : 'text-cerise-200'}`}>Chargement en cours...</p>
            </div>
        );
    }
    return (
            <h1 className="text-2xl mt-20">Bienvenue, {user?.username} !</h1>
    );
};

export default HomePage;
