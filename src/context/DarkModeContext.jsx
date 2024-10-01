import React, { createContext, useContext, useState } from 'react';
const DarkModeContext = createContext();
export const useDarkMode = () => {
    return useContext(DarkModeContext);
};
export const DarkModeProvider = ({ children }) => {
    const savedMode = localStorage.getItem('darkMode');
    const initialMode = savedMode === 'true' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const [isDarkMode, setIsDarkMode] = useState(initialMode);
    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        document.body.classList.toggle('dark', newMode);
    };

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
