import { useEffect, useState, createContext } from "react";
import "./App.css";
import { useNavigate, Route, Routes } from "react-router-dom";

const Context = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  //https://boolean-uk-api-server.fly.dev/MalteStengard/post/{postId}/comment
  //to get comments for each post
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          "https://boolean-uk-api-server.fly.dev/MalteStengard/post"
        ); //change url
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchContacts();
  }, []);

  console.log(posts);
  return (
    <Context.Provider value={{ users, setUsers }}>
      <div className="container">
        <button id="create-post-button" onClick={() => handleNavigation("/createpost")}>Post</button>
        <button id="create-comment-button" onClick={() => handleNavigation("/createcomment")}></button> 
        <button id="create-contact-button" onClick={() => handleNavigation("/home")}>Home</button>
        <button id="create-contact-button" onClick={() => handleNavigation("/profile")}>Profile</button>
        <div>
          <p>hello</p>
        </div>
        <Routes></Routes>
      </div>
    </Context.Provider>
  );
}

export { App };
