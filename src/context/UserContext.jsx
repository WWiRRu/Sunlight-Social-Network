import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [cookies] = useCookies(['user']);

    const initialUser = cookies.user ? cookies.user : null;
    const [user, setUser] = useState(initialUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
