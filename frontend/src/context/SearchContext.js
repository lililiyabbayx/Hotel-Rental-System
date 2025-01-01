import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: { startDate: "", endDate: "" }, // Initialize dates with empty startDate and endDate
  options: {
    adult: 1, // Default number of adults
    child: 0, // Default children count
    room: 1, // Default room count
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return {
        ...state,
        ...action.payload,
        // Ensure that undefined values from payload don't override the state
        dates: action.payload.dates || state.dates,
        options: action.payload.options || state.options,
      };
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
