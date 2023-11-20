import React from 'react'

export default function NewsItemComponent(props) {
  return (
    <div className="my-3" >
    <div className="card">
    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left :'50%', zIndex:'1'}}>
{props.source?props.source:"Unknown"}
</span>
      <img src={props.imgurl?props.imgurl:"https://images.wsj.net/im-838679/social"} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{props.Title}...</h5>
        <p className="card-text">{props.Description}...</p>
        <p className="card-text"><small className="text-muted">By {props.author?props.author : "Unknown"} on {new Date(props.date).toGMTString()}</small></p>
        <a href={props.newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Go somewhere</a>
      </div>
    </div>
    </div>
  )
}
