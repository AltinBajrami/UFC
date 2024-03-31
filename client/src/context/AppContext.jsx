import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebar] = useState(false);
    const [pageId, setPageId] = useState(null);

    const toggleSidebar = () => {
        setIsSidebar(!isSidebarOpen);
    }


    return <AppContext.Provider value={{ isSidebarOpen, toggleSidebar, setPageId, pageId }}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}

export default AppProvider;