import { Context } from "../App";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/PostItemCSS.css"

export default function PostItem({
  postItem: { id, contactId, content, title },
}) {
    const { users, comments } = useContext(Context);
    const [userDetails, setUserDetails] = useState({});
    const [postComments, setPostComments] = useState([]);

    useEffect(() => {
        const user = users.find(user => user.id === contactId);
        if (user) {
          const firstName = user.firstName;
          const lastName = user.lastName;
          const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
          const profileColor = user.favouriteColour;
          setUserDetails({ firstName, lastName, initials, profileColor });
        }
    
        const commentsForPost = comments.filter(comment => comment.postId === id);
        setPostComments(commentsForPost);
      }, [users, comments, contactId, id]);


      console.log(postComments)

      const getUserDetails = (userId) => {
        const user = users.find(user => user.id === userId);
        if (user) {
          const firstName = user.firstName;
          const lastName = user.lastName;
          const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
          const profileColor = user.favouriteColour;
          return { firstName, lastName, initials, profileColor };
        }
        return { firstName: "Unknown", lastName: "User", initials: "UU", profileColor: "#ccc" };
      };
    
      return (
        <li className="post">
          <article className="post">
            <div className="profile-container">
              <div className="profile-image" style={{ backgroundColor: userDetails.profileColor }}>
                {userDetails.initials}
              </div>
              <h1>{userDetails.firstName} {userDetails.lastName}</h1>
            </div>
            <div>
            <p>
                <Link to={`/post/${id}`}>{title}</Link>
              </p>
              <p>
                {content}
              </p>
              <ul className="comments">
                {postComments.map(comment => {
                  const commenterDetails = getUserDetails(comment.contactId);
                  return (
                    <li key={comment.id} className="comment">
                      <div className="comment-profile-container">
                        <div className="profile-image" style={{ backgroundColor: commenterDetails.profileColor }}>
                          {commenterDetails.initials}
                        </div>
                        <span>{commenterDetails.firstName} {commenterDetails.lastName}</span>
                      </div>
                      <p>{comment.content}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
        </li>
      );
}
