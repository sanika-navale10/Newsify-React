import React, { Component } from "react";
import Spinner from "./spinner";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';
export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };
  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Newsify`;
  }
async updateNews(){
  const queryParams = new URLSearchParams(window.location.search);
  const searchQuery = queryParams.get("query");

  let url = "";
  const isSearch = !!searchQuery;

  if (isSearch) {
   
    url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=e59ce4303846446c96f49ce70ebb24dd&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  } else {
   
    url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=e59ce4303846446c96f49ce70ebb24dd&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  }
  this.setState({ loading: true });
  try {
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: parsedData.articles || [],
      totalResults: parsedData.totalResults || 0,
      loading: false,
    });
  } catch (error) {
    console.error("API Error:", error);
    this.setState({ loading: false });
  }
}
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=e59ce4303846446c96f49ce70ebb24dd&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);

    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    this.updateNews();
  }
  handleNextClick = async () => {
    // if (!(this.page + 1 > Math.ceil(this.state.totalResults / 20)) ){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e59ce4303846446c96f49ce70ebb24dd&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  handleprevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
    //   this.props.category
    // }&apiKey=e59ce4303846446c96f49ce70ebb24dd&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "36px 0px" }}>
          Newsify-Top headlines on{" "}
          {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imgurl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author ? element.author : "Unknown"}
                    date={
                      element.publishedAt
                        ? new Date(element.publishedAt).toGMTString()
                        : "Unknown"
                    }
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between my-3">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-dark"
            onClick={this.handleprevClick}
          >
            &larr;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            class="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next&rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
