import { Context } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function PostItem({
  postItem: { id, contactId, content, title },
}) {
  return (
    <li>
      <article className="post">
        
        <h1>
          <Link to={`/contacts/${id}`}>{content}</Link>
        </h1>
      </article>
    </li>
  );
}
