import React, { useMemo } from 'react';
import { Photo } from './Photo';
import InfiniteScroll from "react-infinite-scroll-component";
import { IPhoto } from '../models/IPhoto';

interface PhotoListProps {
  pagePhotos: IPhoto[];
  handleLoadMore: () => void;
  hasMore: boolean;
}

export const PhotoList: React.FC<PhotoListProps> = ({ pagePhotos, handleLoadMore, hasMore }) => {
  const columnFirst = useMemo(() => pagePhotos.filter((e, i) => i % 3 === 0), [pagePhotos]);
  const columnSecond = useMemo(() => pagePhotos.filter((e, i) => i % 3 === 1), [pagePhotos]);
  const columnThird = useMemo(() => pagePhotos.filter((e, i) => i % 3 === 2), [pagePhotos]);

  return (
    <InfiniteScroll
      dataLength={pagePhotos.length}
      next={handleLoadMore}
      hasMore={hasMore}
      loader={<h4>Загрузка...</h4>}
    >
      <div className="photo-list">
        <div className="column">
          {columnFirst.map(photo => <Photo photo={photo} key={photo.id} />)}
        </div>
        <div className="column">
          {columnSecond.map(photo => <Photo photo={photo} key={photo.id} />)}
        </div>
        <div className="column">
          {columnThird.map(photo => <Photo photo={photo} key={photo.id} />)}
        </div>
      </div>
    </InfiniteScroll>
  );
};