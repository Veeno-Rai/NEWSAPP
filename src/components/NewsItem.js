import React, { Component } from 'react'

export class NewsItem extends Component {  
    render()
    {
    let {title,description,imgUrl,url,author,date,source}=this.props;
        return (
            <div className='my-3'>
                <div className="card" style={{width:'18rem'}}>
                    <button className="btn btn-light" type="button" style={{width:'100%'}}>{source}</button>
                    <img src={imgUrl} className="card-img-top" alt="Loading"style={{height:"13rem"}} />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href={url} rel="noreferrer" target="_blank"className="btn btn-sm btn-primary">Read More</a>
                            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem