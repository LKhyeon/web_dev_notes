import React from "react";

export default function pixabayCall(url, setImages, pageNum) {
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
}
