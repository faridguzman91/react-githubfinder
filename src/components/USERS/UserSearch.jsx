import React from "react";
import { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";

function UserSearch() {
  const [text, setText] = useState("");

  const {users, searchUsers, clearSearch} = useContext(GithubContext)

  const handleChange = (event) => setText(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (text === "") {
      alert("please enter something");
    } else {
      //@todo - search users

      searchUsers(text)
      setText("");
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="search..."
                value={text}
                onChange={handleChange}
              />
              <button
                className="button absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
                type="submit"
              >
                go
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* //check if users.length value is more than nothing and display clear button */}
      {users.length > 0 && (
        <div>
          <button onClick={clearSearch} className="btn btn-ghost btn-lg">clear</button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
