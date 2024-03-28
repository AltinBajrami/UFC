import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebar] = useState(false);

    const toggleSidebar = () => {
        setIsSidebar(!isSidebarOpen);
    }


    return <AppContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}

export default AppProvider;