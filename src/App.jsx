import { useEffect, useState, createContext } from "react";
import "./App.css";
import { useNavigate, Route, Routes } from "react-router-dom";
import PostList from "./components/PostList";
import LeftMenu from "./components/LeftMenu";
import Header from "./components/NavBar";

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
  //https://boolean-uk-api-server.fly.dev/MalteStengard/contact
  //to get contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          "https://boolean-uk-api-server.fly.dev/MalteStengard/post"
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        const commentsData = await Promise.all(
          posts.map(async (post) => {
            const response = await fetch(
              `https://boolean-uk-api-server.fly.dev/MalteStengard/post/${post.id}/comment`
            );
            return response.json();
          })
        );
        setComments((prevComments) => [...prevComments, ...commentsData]);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchPostComments();
  }, [posts]);

  console.log("comments " + posts);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://boolean-uk-api-server.fly.dev/MalteStengard/contact"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(posts);
  return (
    <Context.Provider
      value={{
        users,
        setUsers,
        comments,
        setComments,
        posts,
        setPosts,
        handleNavigation,
      }}
    >
      <>
        <Header />
        <div className="input-button-container">
          <input type="text" placeholder="Write your post here..." />
          <button
            id="create-post-button"
            onClick={() => handleNavigation("/createpost")}
          >
            Post
          </button>
          {/* <button
            id="create-comment-button"
            onClick={() => handleNavigation("/createcomment")}
          ></button> */}
        </div>
        <div className="layout">
          <LeftMenu />
          <PostList />
        </div>
      </>
      <div className="container">
        <div>
          <p>hello</p>
        </div>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/" element={<LeftMenu />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export { App, Context };
