import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
    static defaultProps={
        country:'in',
        category:'general',
        pageSize:6,
        totalResults:0
    }
    static propTypes={
        country:PropTypes.string,
        category:PropTypes.string,
        pageSize:PropTypes.number
    }
    capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase() +string.slice(1);
    }
    constructor(props)
    {
        super(props);
        this.state={
           articles:[],
           loading:false,
           page:1,
           totalResults:0
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)} - In-News`;
    }
    async UpdateNews()
    {
        this.props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data= await fetch(url);
        this.props.setProgress(30);
        let parsedData= await data.json();
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({articles: parsedData.articles ,totalResults:parsedData.totalResults,loading:false})
        this.props.setProgress(100);
    }
    async componentDidMount()
    {
      this.UpdateNews();
    }
    fetchMoreData = async() => {
      
       let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
       this.setState({page:this.state.page+1})
       let data= await fetch(url);
       let parsedData= await data.json();
       this.setState({articles: this.state.articles.concat(parsedData.articles) ,totalResults:parsedData.totalResults,loading:false})
      };
  render() {
    return (
        <>
         <h2 className='text-center' style={{marginTop:"90px"}}>In-News : Top Headlines</h2>
         {this.state.loading && <Spinner/>}
         <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
            <div className="container">
         <div className="row">
             {this.state.articles.map((element)=>{
                    return  <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ?element.title.slice(0,50):""} description={element.description?element.description.slice(0,60):""} imgUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
             })}
         </div>
         </div>
        </InfiniteScroll>
        </>
    )
  }
}

export default News