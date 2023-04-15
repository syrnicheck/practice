import React, { useEffect, useState } from 'react';
import { useElements } from '../hooks/useElements';
import '../styles/mainPage.css';
import { MainNavigation } from '../components/MainNavigation';
import { PhotoList } from '../components/PhotoList';
import { IElement } from '../models/IElement';

export function MainPage() {
  const { elements, error, fetchElements } = useElements();
  const [nextPage, setNextPage] = useState(1);
  const [pageElements, setPageElements] = useState<IElement[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchElements();
  }, []);

  useEffect(() => {
    console.log("fetch")
    setPageElements(prevPageElements => [...prevPageElements, ...elements]);
    setNextPage(nextPage + 1);
    setHasMore(elements.length > 0);
  }, [elements])

  const handleLoadMore = () => {
    fetchElements(nextPage);
    console.log(nextPage)
  };

  return (
    <>
      <MainNavigation />

      <div className="container">
        {error && <p>{error}</p>}
        <h2 className="main-page-title">Free Stock Photos</h2>
        <PhotoList
          pageElements={pageElements}
          handleLoadMore={handleLoadMore}
          hasMore={hasMore}
        />
      </div>
    </>
  );
}
