import { Context } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "../style/PostListCSS.css"


export default function PostItem({
  postItem: { id, contactId, content, title },
}) {
    const { users } = useContext(Context);
    let firstName
    let lastName
    users.forEach(user => {
        if (user.id === contactId) {
            firstName = user.firstName;
            lastName = user.lastName;
        }
    });

  return (
    <li className="post">
      <article className="post">
        <h1>{firstName} {lastName}</h1>
        <h1>
          <Link to={`/contacts/${id}`}>{content}</Link>
        </h1>
      </article>
    </li>
  );
}
