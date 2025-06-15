import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgurl, newsUrl, author, date,source } = this.props;
    return (
      <div>
        <div className="card">
          <img
            src={!imgurl ? "images.png" : imgurl}
            className="card-img-top"
            alt="..."
          />
          <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger"style={{left: '90%', zIndex: '1'}}>
            {source}
          </span>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p class="card-text">
              <small class="text-body-secondary">
                By {author} on {date}
              </small>
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
