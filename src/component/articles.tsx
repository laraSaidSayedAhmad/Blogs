import Commnets, { CommentProps } from "./comment";
import { useEffect, useState } from "react";
import axios from "axios";

export interface Article {
  commentList: CommentProps[];
}

const Articles: React.FC<{}> = () => {
  const [commentList, setCommentList] = useState<CommentProps[]>([]);

  useEffect(() => {
    axios
      .get<Article>("https://api.realworld.io/api/articles/{slug}/comments")
      .then((response) => {
        setCommentList(response.data.commentList);
      });
  }, []);

  if (!commentList) return null;

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>How to build webapps that scale</h1>
          <div className="article-meta">
            <a href="">
              <img src="http://i.imgur.com/Qr71crq.jpg" />
            </a>
            <div className="info">
              <a href="" className="author">
                Eric Simons
              </a>
              <span className="date">January 20th</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow Eric Simons <span className="counter">(10)</span>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post <span className="counter">(29)</span>
            </button>
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>
              Web development technologies have evolved at an incredible clip
              over the past few years.
            </p>
            <h2 id="introducing-ionic">Introducing RealWorld.</h2>
            <p>It's a great solution for learning how other frameworks work.</p>
          </div>
        </div>
        <hr />
        <div className="article-actions">
          <div className="article-meta">
            <a href="profile.html">
              <img src="http://i.imgur.com/Qr71crq.jpg" />
            </a>
            <div className="info">
              <a href="" className="author">
                Eric Simons
              </a>
              <span className="date">January 20th</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow Eric Simons
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post <span className="counter">(29)</span>
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  rows={3}
                ></textarea>
              </div>
              <div className="card-footer">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  className="comment-author-img"
                />
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>
            {commentList.map((comment) => (
              <Commnets
                body={comment.body}
                createdAt={comment.createdAt}
                updatedAt={comment.updatedAt}
                key={comment.id}
                id={comment.id}
                author={comment.author}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
