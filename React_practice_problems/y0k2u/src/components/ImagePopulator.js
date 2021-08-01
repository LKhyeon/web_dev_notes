import React, { useCallback, useEffect, useState } from "react";

export default function ImagePopulator(props) {

  const [urlEncoded, setUrlEncoded] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [images, setImages] = useState([]);

  const loadMore = (event) => {
    const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
    if (bottom) {
      setPageNum(pageNum + 1);
    }
  }

  const fetchData = useCallback((url) => {
    fetch(url)
    .then(res => {
      if (res && res.ok) {
        return res.json();
      }
    })
    .then(data => {
      const imgElements = [];
      const arr = data.hits;
      for (let i = 0; i < arr.length; i++) {
        imgElements.push(
          <div key={`page=${pageNum} num=${i}`} className='imgGrid'>
            <img alt='' src={arr[i].previewURL}/>
          </div>
        );
      }
      setImages(images => images.concat(imgElements));
    })
    .catch(err => console.log(err));
  }, [pageNum]);

  useEffect(() => {
    // When the query changes, we should reset our search results.
    if (props.query) {
      setImages([]);
      setPageNum(1);
      setUrlEncoded(encodeURI(props.query));
    }
  }, [props.query])

  useEffect(() => {
    if (urlEncoded) {
      const request = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API}&q=${urlEncoded}&page=${pageNum}`;
      fetchData(request);
    }
  }, [urlEncoded, pageNum, fetchData])

  return (
    <div className="Container" onScroll={loadMore}>
      {images}
    </div>
  );
}