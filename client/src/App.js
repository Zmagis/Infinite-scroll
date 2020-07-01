import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ImageBox from './imageBox/ImageBox';

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/data', { params: page })
      .then((response) => {
        let arr = JSON.parse(response.data.text);
        let newA = arr.photos.photo;
        setData((prev) => [...prev, ...newA]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  const handleSort = () => {
    let sortedArr = data.sort((a, b) => (a.title > b.title ? 1 : -1));
    setData(sortedArr);
    setIsSorted(true);
  };
  useEffect(() => {
    if (isSorted) {
      handleSort();
      setIsSorted(false);
    }
  }, [isSorted, handleSort]);

  return (
    <div className="App">
      <h1>
        Infinite Scroll
        <i
          className="fas fa-sort-alpha-down sort-icon"
          onClick={handleSort}
        ></i>
      </h1>
      <ImageBox data={data} page={page} setPage={setPage} loading={loading} />
    </div>
  );
}

export default App;
