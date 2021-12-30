import { Fragment } from "react";
import { Link } from "react-router-dom";

export interface ArticleProps {
  id: number;
  tagList: string[];
  updatedAt: Date;
  description: string;
  body: string;
  title: string;
  author: User;
}

interface User {
  username: string;
}
const Article: React.FC<ArticleProps> = ({
  id,
  updatedAt,
  tagList,
  description,
  body,
  title,
  author,
}) => {
  return (
      <div key={id} className="article-preview">
        <div className="article-meta">
          <a href="">
            <Link to={`/profiles/${author.username}`}>
              <img src="http://i.imgur.com/Qr71crq.jpg" />
            </Link>
          </a>
          <div className="info">
            <a href="" className="author">
              <Link to={`/profiles/${author.username}`}>
                <p>{author.username}</p>
              </Link>
            </a>
            <span className="date">{updatedAt}</span>
          </div>
        </div>
        <a href="" className="preview-link">
          <h1>{title}</h1>
          <p>{description}</p>
          <span>{body}</span>
        </a>
        <div>
          {tagList.map((tag) => (
            <a href="" className="tag-pill tag-default">
              {tag}
            </a>
          ))}
        </div>
      </div>
  );
};

export default Article;
