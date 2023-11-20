import React, { Component } from "react";
import NewsItemComponent from "./NewsItemComponent";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0,
    };
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  update=async()=> {
    this.props.setProgress(10);
    console.log(this.state.page)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(30);
    await this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      page : 2,
      loading:false
    });
    console.log(this.state.page)
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsPro`
    this.props.setProgress(100);
  }
  componentDidMount = async()=> {
    this.update();
  }
  fetchMoreData = async()=>
  {
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    await this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page : this.state.page+1
    });
    console.log(this.state.page)
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsPro`
  }

  render() {
    return (
      <>
        <h2 className="text-center">Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner />}
        >
           <div className="container">
        <div className="row">
          { this.state.articles.map((element) => {
              return (
                <div className="col-md-4 col-lg-3" key={element.url}>
                  <NewsItemComponent
                    Title={element.title ? element.title.slice(0, 45) : ""}
                    Description={
                      element.description
                        ? element.description.slice(0, 50)
                        : ""
                    }
                    imgurl={element.urlToImage}
                    newsurl={element.url}
                    date={element.publishedAt}
                    author={element.author}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
       </div>
        </InfiniteScroll>
  
        </>
      
    );
  }
}

export default News;
