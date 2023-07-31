import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from './Spinner';
import propTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

  static defaultProps = {
    pgSize:   12,
    category: 'us'
    
  }

  static propTypes = {
    country: propTypes.string,
    pgSize:   propTypes.number,
    category: propTypes.string
    

  }

  updateNews = async (props)=>{
    this.props.setProgress(0);
    let url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dafb8b47a90548c49056776de425cc1a&page=${this.state.page}&pageSize=${this.props.pgSize}`;
    
    this.setState({loading:true})
    this.props.setProgress(20);
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({ articles: parsedData.articles,
                    results: parsedData.totalResults,
                    loading: false });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  upperCase = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      results: 0
    };
    // document.title = `${this.upperCase(this.props.category)} News - SK News`
  };


  fetchMore = async (props)=>{
    let url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dafb8b47a90548c49056776de425cc1a&page=${this.state.page+1}&pageSize=${this.props.pgSize}`;
    
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    setInterval(() => {
      this.setState({ articles: this.state.articles.concat(parsedData.articles),
        results: parsedData.totalResults,
        page : this.state.page + 1,
        loading: false });
      }, 1500);
      }


// ........for buttons..........
  //   handleNext = async () => {
  //     this.updateNews();
  //     this.setState({
  //       page: this.state.page + 1,
        
  //     });
  //   };
    
    
  //   handlePrev = async () => {
  //     this.updateNews();
  //     this.setState({
  //       page: this.state.page - 1,
  //     });
  // }

  render() {
    return (
      <>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMore}
          hasMore={this.state.articles.length !== this.state.results}
          loader={<h4><Spinner/></h4>}
        >
          <h2 className="text-center " style={{marginTop:"100px"}}>
          <u>SK News - Top {this.upperCase(this.props.category)} Headlines</u>
          </h2>
          {this.state.loading && <Spinner/>}

          <div className="container mt-4">

            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4 my-4">
                    <Newsitem
                      title={element.title}  description={element.description}  imgUrl={element.urlToImage == null? "https://cdn.ndtv.com/common/images/ogndtv.png": element.urlToImage}  author={element.author}  publish={element.publishedAt}
                      urlDesc={element.url}
                      />
                  </div>
                );
              })}
            </div>
          </div>
          </InfiniteScroll>

            {/* //.......for buttons....... */}
          {/* <div className="container my-3">
            <hr />
          </div>
          <div className="container my-5 d-flex justify-content-between">
            <button disabled={this.state.page <= 1}
              className="btn btn-primary btn-lg"
              onClick={this.handlePrev}
              type="button"
            >
              &larr; Previous
            </button>

            <button disabled = {this.state.page + 1 > Math.ceil(this.state.results/this.props.pgSize)}
              className="btn btn-primary btn-lg"
              onClick={this.handleNext}
              type="button"
            >
              Next &rarr;
            </button>
          </div> */}
  
      </>
    );
  }
}
