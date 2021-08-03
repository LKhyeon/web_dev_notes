import React, { useCallback, useEffect, useState } from "react";
import pixabayCall from "../APICalls/pixabayCall";

interface ImagePopulatorProps {
  query: string,
};

export default function ImagePopulator(props: ImagePopulatorProps): JSX.Element {

  const [urlEncoded, setUrlEncoded] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [images, setImages] = useState<Array<JSX.Element>>([]);

  const loadMore = (event: React.UIEvent<HTMLElement>) => {
    const bottom = event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight;
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
