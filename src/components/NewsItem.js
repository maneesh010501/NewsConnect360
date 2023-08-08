import React from 'react'

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, source, author, date } = props;
    return (
        <div className='my-3'>
            <div className="card">
                <small className="text-body-secondary"><h5 className="card-header">{source.name}</h5></small>
                {/* <p className="card-header ">{source.name}</p> */}
                <img src={imageUrl ? imageUrl : "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">By <strong>{author ? author : "Unknown"}</strong> on <strong>{new Date(date).toGMTString()}</strong></small></p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>

                </div>
            </div>
        </div>
    )
}


export default NewsItem
