import React, { Component } from "react";

export default class Newsitem extends Component {
  // style={{ width: "25rem" }}
  render() {
    let { title, description, imgUrl ,urlDesc, author, publish } = this.props;
    return (
      <div className="card">
          <div className="card-body">
            <img src={imgUrl} style={{height: "200px",width: "380px"}} className="card-img-top m-auto my-3" alt="" />
            <h4 className="card-title">{title}</h4>
            <p className="card-text">{description}</p>
            <p class="card-text"><small class="text-body-secondary"> By {author == null?"Unknown":author} , published on  {new Date(publish).toDateString()}</small></p>
            <a href={urlDesc} rel="noreferrer" target="_blank" className="btn" style={{backgroundColor :'#8757e6',color:'white'}}>
              Read More
            </a>
        </div>
      </div>
    );
  }
}
