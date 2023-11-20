import React, { useEffect,useState } from "react";
import NewsItemComponent from "./NewsItemComponent";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props) =>{
    const [articles,setArticles]=useState([])
    const [loading,setLoading]=useState(true)
    const [page,setPage]=useState(1)
    const [totalResults,setTotalResults]=useState(0)

  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const update=async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(30);
    
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    document.title=`${capitalizeFirstLetter(props.category)}-NewsPro`
    props.setProgress(100);
  }
  useEffect(() => {
    update();
    //eslint-disable-next-line
  }, [])
  
 
  const fetchMoreData = async()=>
  {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
  setPage(page+1);
  setLoading(true);
  let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    document.title=`${capitalizeFirstLetter(props.category)}-NewsPro`
  }
  return (
    <>
          <h2 className="text-center" style={{margin: '80px 50px 10px 10px'}} >Top {capitalizeFirstLetter(props.category)} Headlines</h2>
       {loading && <Spinner />}
       <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner />}
        >
           <div className="container">
        <div className="row">
          { articles.map((element) => {
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
  )
}

export default News

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};