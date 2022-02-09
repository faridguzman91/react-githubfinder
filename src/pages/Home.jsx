import React from 'react'
import UserResults from '../components/USERS/UserResults'
import UserSearch from '../components/USERS/UserSearch'

function Home() {
  return (
    <>
      
      {/* {process.env.REACT_APP_GITHUB_TOKEN} */}

      
      {/* SEARCH COMPONENT */}
      <UserSearch />
      <UserResults />
    </>
  )
}

export default Home
