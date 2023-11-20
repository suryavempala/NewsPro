import React, { Component } from 'react'

export class NewsItemComponent extends Component {
  render() {
    let {Title,Description,imgurl,newsurl,author,date,source}=this.props;
    return (
      <div className="my-3" >
      <div className="card">
      <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left :'50%', zIndex:'1'}}>
{source?source:"Unknown"}
  </span>
        <img src={imgurl?imgurl:"https://images.wsj.net/im-838679/social"} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{Title}...</h5>
          <p className="card-text">{Description}...</p>
          <p className="card-text"><small className="text-muted">By {author?author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
          <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Go somewhere</a>
        </div>
      </div>
      </div>
    )
  }
}

export default NewsItemComponent