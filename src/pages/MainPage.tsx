import React, { useEffect, useState } from 'react';
import { usePhotos } from '../hooks/usePhotos';
import '../styles/mainPage.css';
import { MainNavigation } from '../components/MainNavigation';
import { PhotoList } from '../components/PhotoList';
import { IPhoto } from '../models/IPhoto';

export function MainPage() {
  const { photos, error, fetchPhotos } = usePhotos();
  const [nextPage, setNextPage] = useState(1);
  const [pagePhotos, setPagePhotos] = useState<IPhoto[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    console.log("fetch")
    setPagePhotos(prevPagephotos => [...prevPagephotos, ...photos]);

    setHasMore(photos.length > 0);
  }, [photos])

  const handleLoadMore = () => {
    setNextPage(nextPage + 1);
    fetchPhotos(nextPage + 1);
    console.log(nextPage)
  };

  return (
    <>
      <MainNavigation />

      <div className="container">
        {error && <p>{error}</p>}
        <h2 className="main-page-title">Free Stock Photos</h2>
        <PhotoList
          pagePhotos={pagePhotos}
          handleLoadMore={handleLoadMore}
          hasMore={hasMore}
        />
      </div>
    </>
  );
}
