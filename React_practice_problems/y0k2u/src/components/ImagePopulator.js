import React, { useCallback, useEffect, useState } from "react";
import pixabayCall from "../APICalls/pixabayCall";

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
    pixabayCall(url, setImages, pageNum);
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
