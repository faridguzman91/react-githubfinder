import React from "react";
import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  //   const [users, setUsers] = useState([]);
  //   const [loading, setLoading] = useState([true]);

  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  //dispatch action to reducer like useState set
  //https://dmitripavlutin.com/react-usereducer/

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //get initial users (test)

  //   const fetchUsers = async () => {

  const clearSearch = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  //get multiple users

  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json();

    // console.log(data)

    //  setUsers(data);
    //  setLoading(false);

    //instead use reducer actions:

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  //get user repos

  const getUserRepos = async (login) => {
    setLoading();

    //sort by latest

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users?${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  //get a single user

  const getUser = async (login) => {
    setLoading();

    // const params = new URLSearchParams({
    //   q: text,
    // });

    const response = await fetch(`${GITHUB_URL}/user?${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();

      dispatch({
        //get data from single user with only single user data payload
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //set loading, action dispatch

  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  return (
    <GithubContext.Provider
      value={{
        //useReducer dispatching states
        user: state.user,
        users: state.users,
        loading: state.loading,
        repos: state.repos,
        //call functions
        searchUsers,
        getUser,
        clearSearch,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
