import React from 'react'
import {createContext, useReducer} from "react"
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


export const GithubProvider = ({ children }) => {
  //   const [users, setUsers] = useState([]);
  //   const [loading, setLoading] = useState([true]);

  const initialState = {
    users: [],
    loading: false,
  };

  //dispatch action to reducer like useState set
  //https://dmitripavlutin.com/react-usereducer/

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //get initial users (test)

  const fetchUsers = async () => {
      setLoading()

    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    // console.log(data)

    //  setUsers(data);
    //  setLoading(false);

    //instead:

    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };

  //set loading

  const setLoading = () => dispatch({
      type: 'SET_LOADING',
  })

  return (
    <GithubContext.Provider
      value={{
        //useReducer dispatching states
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
}

export default GithubContext