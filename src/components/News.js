import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    // static defaultProps = {
    //     country: 'in',
    //     // pageSize: 5,
    //     category: 'general'
    // }
    // static propTypes = {
    //     country: PropTypes.string,
    //     // pageSize: PropTypes.number,
    //     category: PropTypes.string
    // }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    // key=de4f1005a3f34382955fdfec1b9869f9
    // key=
    useEffect(() => {
        document.title = `NewsConnect360 - ${capitalize(props.category)}`;
        console.log('useEffect!')
        updateNews();
    }, [])


    // const handlePrevClick = async () => {
    //     this.setState({ page: this.state.page - 1 });
    //     setPage(page-1);
    //     updateNews();
    // }
    // const handleNextClick = async () => {
    //     if (this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)) {
    //     }
    //     else {
    //         setPage(page+1);
    //         updateNews();
    //     }
    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    };



    const currentDate = new Date();
    const formattedDate = currentDate.toDateString();
    return (
        <div className='container my-3'>
            <h3 className='text-center' style={{ marginTop: '75px' }}>NewsConnect360 - Top {capitalize(props.category)} headlines</h3>
            <p style={{ marginTop: '15px', marginLeft: '17px' }}>{formattedDate}</p>

            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 90) : ""} imageUrl={element.urlToImage} newsUrl={element.url} source={element.source} author={element.author} date={element.publishedAt} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
        </div>
    )
}


News.defaultProps = {
    country: 'in',
    // pageSize: 5,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    // pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
