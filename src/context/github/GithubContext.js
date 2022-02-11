import React from "react";
import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

// const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  //   const [users, setUsers] = useState([]);
  //   const [loading, setLoading] = useState([true]);

  //set initial states

  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  //dispatch action to reducer like useState set
  //https://dmitripavlutin.com/react-usereducer/

  const [state, dispatch] = useReducer(githubReducer, initialState);


  return (
    <GithubContext.Provider
      value={{
        //call states
        ...state,
        //call functions
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
