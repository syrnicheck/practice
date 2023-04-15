import React from 'react';
import { Element } from '../components/Element';
import InfiniteScroll from "react-infinite-scroll-component";
import { IElement } from '../models/IElement';

interface PhotoListProps {
  pageElements: IElement[];
  handleLoadMore: () => void;
  hasMore: boolean;
}

export const PhotoList: React.FC<PhotoListProps> = ({ pageElements, handleLoadMore, hasMore }) => {
  const columnFirst = pageElements.filter((e, i) => i % 3 === 0);
  const columnSecond = pageElements.filter((e, i) => i % 3 === 1);
  const columnThird = pageElements.filter((e, i) => i % 3 === 2);

  return (
    <InfiniteScroll
      dataLength={pageElements.length}
      next={handleLoadMore}
      hasMore={hasMore}
      loader={<h4>Загрузка...</h4>}
    >
      <div className="photo-list">
        <div className="column">
          {columnFirst.map(element => <Element element={element} key={element.id} />)}
        </div>
        <div className="column">
          {columnSecond.map(element => <Element element={element} key={element.id} />)}
        </div>
        <div className="column">
          {columnThird.map(element => <Element element={element} key={element.id} />)}
        </div>
      </div>
    </InfiniteScroll>
  );
};