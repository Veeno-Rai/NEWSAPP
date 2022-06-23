import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps={
        country:'in',
        category:'general',
        pageSize:6
    }
    static propTypes={
        country:PropTypes.string,
        category:PropTypes.string,
        pageSize:PropTypes.number
    }
    articles= [] 
    capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase() +string.slice(1);
    }
    constructor(props)
    {
        super(props);
        this.state={
           articles:this.articles,
           loading :false,
           page:1
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)} - In-News`;
    }
    async UpdateNews()
    {
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e730045e6fd54e88b38f50ca6cc449c0&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data= await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles ,totalResults:parsedData.totalResults,loading:false})
    }
    async componentDidMount()
    {
      this.UpdateNews();
    }
    handleNextClick = async ()=>{
        // if(! (this.state.page+1 > Math.ceil(this.state.totalResults/20)))
        // {
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e730045e6fd54e88b38f50ca6cc449c0&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data= await fetch(url);
        // let parsedData= await data.json();
        // console.log(parsedData);
        // this.setState({
        //     page:this.state.page +1,
        //     articles: parsedData.articles,
        //     loading:false
        // })
        //     }
        this.setState({page:this.state.page+1});
        this.UpdateNews();
    }
    handlePrevBtn= async ()=>{
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e730045e6fd54e88b38f50ca6cc449c0&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data= await fetch(url);
        // let parsedData= await data.json();
        // console.log(parsedData);
        // this.setState({
        //     articles: parsedData.articles,
        //     page:this.state.page-1,
        //     loading:false
        // })
        this.setState({page:this.state.page-1});
        this.UpdateNews();
    }
  render() {
    return (
     <div className="container my-3">
         <h2 className='text-center'>In-News : Top Headlines</h2>
        {this.state.loading && <Spinner/>} 
         <div className="row">
             {!this.state.loading && this.state.articles.map((element)=>{
                    return  <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ?element.title.slice(0,50):""} description={element.description?element.description.slice(0,60):""} imgUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
             })}
         </div>
         <div className="container d-flex justify-content-between">
         <button id="prev" disabled={this.state.page<=1} type="button" className="btn btn-secondary" onClick={this.handlePrevBtn}>&larr;Previous </button>
         <button id="next" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-secondary" onClick={this.handleNextClick}>Next&rarr;</button>
         </div>
     </div>
    )
  }
}

export default News