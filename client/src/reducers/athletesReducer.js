const reducer = (state, action) => {
  if (action.type === 'GET_ATHLETES_BEGIN') {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  }
  if (action.type === 'GET_ATHLETES_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      isError: false,
      allAthletes: [...action.payload],
      filteredAthletes: [...action.payload],
    };
  }
  if (action.type === 'GET_ATHLETES_ERROR') {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }
  if (action.type === 'UPDATE_FILTERS') {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (action.type === 'FILTER_ATHLETES') {
    const { allAthletes } = state;
    const { text, country, gender, fightingStyle, status } = state.filters;
    let tempAthletes = [...allAthletes];
    if (text) {
      tempAthletes = tempAthletes.filter(item =>
        item.fighterName.toLowerCase().startsWith(text)
      );
    }
    if (country.toLowerCase() !== 'all') {
      tempAthletes = tempAthletes.filter(
        item => item.country.toLowerCase() === country.toLowerCase()
      );
    }
    if (gender.toLowerCase() !== 'all') {
      tempAthletes = tempAthletes.filter(
        item => item.gender.toLowerCase() === gender.toLowerCase()
      );
    }
    if (fightingStyle.toLowerCase() !== 'all') {
      tempAthletes = tempAthletes.filter(
        item => item.fightingStyle.toLowerCase() === fightingStyle.toLowerCase()
      );
    }
    if (status.toLowerCase() !== 'all') {
      tempAthletes = tempAthletes.filter(
        item => item.status.toLowerCase() === status.toLowerCase()
      );
    }

    return { ...state, filteredAthletes: [...tempAthletes] };
  }
  if (action.type === 'CLEAR_FILTERS') {
    return {
      ...state,
      filters: {
        ...state.filters,
        status: 'all',
        text: '',
        country: 'all',
        gender: 'all',
        fightingStyle: 'all',
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default reducer;
