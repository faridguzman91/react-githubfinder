const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      //return all properties from state, and dispatch payload action
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
//get user data and repo data in one case

    case "GET_USER_AND_REPOS":
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };

      //clear all users action for clear button
    case "CLEAR_USERS":
      return {
        ...state,
        users: [],
      };
    default:
      return state;
  }
};

export default githubReducer;
