import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});


//set search value

export const searchUsers = async (text) => {
  //    setLoading();
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`)
  return response.data.items
}

//Get user and repos from one function

export const getUserAndRepos = async(login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`)
  ])

  return { user: user.data, repos: repos.data}
}
  
  
  
  
  
  
  
  
  
  
  
  
  


  //cleanup







  // const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
  //   headers: {
  //     Authorization: `token ${GITHUB_TOKEN}`,
  //   },
  // });
  // const { items } = await response.json();
  // return items;
// };

//get user repos

// export const getUserRepos = async (login) => {
//   // setLoading();
//   //sort by latest
//   const params = new URLSearchParams({
//     sort: "created",
//     per_page: 10,
//   });
//   const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
//     headers: {
//       Authorization: `token ${GITHUB_TOKEN}`,
//     },
//   });
//   const data = await response.json();
//   return data;
//   // dispatch({
//   //   type: "GET_REPOS",
//   //   payload: data,
//   // });
// };

//get a single user

// export const getUser = async (login) => {
//   // setLoading();
//   const response = await fetch(`${GITHUB_URL}/user?${login}`, {
//     headers: {
//       Authorization: `token ${GITHUB_TOKEN}`,
//     },
//   });

//   //shot 404 error if not found, else await respons and return

//   if (response.status === 404) {
//     window.location = "/notfound";
//   } else {
//     const data = await response.json();
//     return data;
//   }
// };