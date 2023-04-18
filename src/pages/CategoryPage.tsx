import React, { useState, useEffect, ChangeEvent } from "react";
import { useCategoryPhotos } from "../hooks/useCategoryPhotos";
import '../styles/mainPage.css';
import { useSelector } from "react-redux";
import { Navigation } from '../components/Navigation';
import { AppState } from "../models/model";
import { PhotoList } from "../components/PhotoList";
import { IPhoto } from "../models/IPhoto";
import { HOME_PAGE_URL } from "../constants/app";
import { useNavigate } from 'react-router-dom';


export function CategoryPage() {
    const { totalResults, photos, error, loading, fetchCategoryPhotos } = useCategoryPhotos();
    const [nextPage, setNextPage] = useState(1);
    const [pagePhotos, setPagePhotos] = useState<IPhoto[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [orientation, setOrientation] = useState("");
    const [size, setSize] = useState("");
    const category = useSelector((state: AppState) => state.category);
    const navigate = useNavigate();

    useEffect(() => {
        setNextPage(1);
        setPagePhotos([])
        fetchCategoryPhotos(nextPage, category.selectedCategory, orientation, size);
    }, [category.selectedCategory])

    useEffect(() => {
        setPagePhotos(prevPagephotos => [...prevPagephotos, ...photos]);     
        setHasMore(photos.length > 0);
    }, [photos])

    const handleLoadMore = () => {
        setNextPage(nextPage + 1);
        fetchCategoryPhotos(nextPage + 1, category.selectedCategory, orientation, size);
        
    };

    const formatNumber = (num: number): string => {
        if (num >= 1000) {
            const abbreviatedNumber = num / 1000;
            return `${abbreviatedNumber}k`;
        } else {
            return num.toString();
        }
    }

    const optionOrientationHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setOrientation(event.target.value);
        fetchCategoryPhotos(nextPage, category.selectedCategory, event.target.value, size);
        setPagePhotos([]);
    };

    const optionSizeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSize(event.target.value);
        fetchCategoryPhotos(nextPage, category.selectedCategory,  orientation, event.target.value);
        setPagePhotos([]);
    };

    return (
        <>
            <Navigation />
            <div>
                <div className="container">
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {totalResults === 0 ? 
                    <>
                        <div className="category-page-title" >We couldn’t find anything for "{category.selectedCategory}".
                        Try to refine your search.</div>
                        <button className="back-to-home-page" onClick={()=>{navigate(HOME_PAGE_URL)}}>Go to the main page</button>
                    </>
                    :
                    <>
                    <div className="category-page-title">{category.selectedCategory} Photos</div>
                    <div className="category-result">
                        <div className="search-results">Photos <span className="number">{formatNumber(Number(totalResults))} </span> </div>
                        <div className="filters">
                            <select className="filter" value={orientation} onChange={optionOrientationHandler}>
                                <option value="" >All Orientations</option>
                                <option value="landscape">Horizontal</option>
                                <option value="portrait">Vertical</option>
                                <option value="square">Square</option>
                            </select>
                            <select className="filter" value={size} onChange={optionSizeHandler}>
                                <option value="">All Sizes</option>
                                <option value="large">Large</option>
                                <option value="medium">Medium</option>
                                <option value="small">Small</option>
                            </select>
                        </div>
                    </div>
                    <PhotoList
                        pagePhotos={pagePhotos}
                        handleLoadMore={handleLoadMore}
                        hasMore={hasMore}
                    />
                    </>
                    }
                </div>
            </div>
        </>
    )
}