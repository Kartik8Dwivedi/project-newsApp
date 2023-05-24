import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends Component {
    static defaultProps = {
        country : 'in',
        pageSize : 8,
        category : 'general',
    }
//     static propTypes = {
//         country : this.PropTypes.string,
//         pageSize : this.PropTypes.number,
//         category : this.PropTypes.string,
// }
    constructor(){
        super();
        this.state = {
            articles : [], 
            loading : false,
            page : 1,
            totalArticles : 0
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=68b9a4ba18184998a45efd6091f1d2f9&pageSize=${this.props.pageSize}&page=1`
        this.setState({loading : true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles : parsedData.articles, 
            totalArticles : parsedData.totalResults,
            loading : false
        })
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=68b9a4ba18184998a45efd6091f1d2f9&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);

        this.setState(
            {
                page : this.state.page-1, 
                articles : parsedData.articles,
                totalArticles : parsedData.totalResults
            }
        )
    }
    handleNextClick = async () => {
        if(Math.ceil(this.state.totalArticles/this.props.pageSize)>this.state.page+1){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=68b9a4ba18184998a45efd6091f1d2f9&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`
            this.setState({loading : true})
            let data = await fetch(url);
            let parsedData = await data.json();

            this.setState(
                {
                    page : this.state.page+1, 
                    articles : parsedData.articles,
                    loading : false
                }
            )
        }
    }

        render() {
        return (
            <div className="wrapper ">
                { this.state.loading && <Spinner/>}
                <div className='flex flex-wrap gap-8 w-screen justify-around' >
                    {!this.state.loading && this.state.articles.map((ele)=>{
                        return <div key={ele.url}>
                                    <NewsItem title={ele.title} description={ele.description}  imageUrl={ele.urlToImage} newsUrl={ele.url}/>
                                </div>
                    })}

                </div>
                <div className='flex w-screen justify-around mt-10'>
                    <button className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={this.handlePrevClick} disabled={this.state.page<=1}>&larr; Previous</button>
                    <button className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={this.handleNextClick} disabled={this.state.page+1 > Math.ceil(this.state.totalArticles/this.props.pageSize)}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
