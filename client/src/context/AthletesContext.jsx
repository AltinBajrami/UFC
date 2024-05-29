import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducers/athletesReducer'
import customFetch from "../utils";

const AthleteContext = createContext();
const defaultState = {
    allAthletes: [],
    filteredAthletes: [],
    isLoading: true,
    isError: false,
    filters: {
        status: 'all',
        text: '',
        country: 'all',
        gender: 'all',
        fightingStyle: 'all',
    }
};

const AthleteProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const fetchAthletes = async () => {
        dispatch({ type: 'GET_ATHLETES_BEGIN' })
        try {
            const response = await customFetch('/fighters', { withCredentials: true });
            const { fighters } = response.data;
            dispatch({ type: 'GET_ATHLETES_SUCCESS', payload: fighters })
        } catch (error) {
            dispatch({ type: 'GET_ATHLETES_ERROR' })
        }
    }

    const updateFilters = (e) => {
        let name = e.target.name
        let value = e.target.value
        if (name === 'status') {
            value = e.target.textContent
        }
        dispatch({ type: 'UPDATE_FILTERS', payload: { name, value } })
    }

    const clearFilters = () => {
        dispatch({ type: 'CLEAR_FILTERS' })
    }

    useEffect(() => {
        dispatch({ type: 'FILTER_ATHLETES' })
    }, [state.filters])

    return <AthleteContext.Provider value={{ ...state, clearFilters, updateFilters, fetchAthletes }}>
        {children}
    </AthleteContext.Provider>
}

export const useAthleteContext = () => {
    return useContext(AthleteContext);
}

export default AthleteProvider;