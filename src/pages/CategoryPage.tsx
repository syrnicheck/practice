import React, { useState, useEffect, ChangeEvent } from "react";
import { useCategoryElements } from "../hooks/useCategoryElements";
import '../styles/mainPage.css';
import { useSelector } from "react-redux";
import { Navigation } from '../components/Navigation';
import { AppState } from "../models/model";
import { PhotoList } from "../components/PhotoList";
import { IElement } from "../models/IElement";
import { HOME_PAGE_URL } from "../constants/app";
import { useNavigate } from 'react-router-dom';


export function CategoryPage() {
    const { totalResults, elements, error, loading, fetchCategoryElements } = useCategoryElements();
    const [nextPage, setNextPage] = useState(1);
    const [pageElements, setPageElements] = useState<IElement[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [orientation, setOrientation] = useState("");
    const [size, setSize] = useState("");
    const category = useSelector((state: AppState) => state.category);
    const navigate = useNavigate();


    useEffect(() => {
        setPageElements([])
        fetchCategoryElements(nextPage, category.selectedCategory, orientation, size);
        console.log(category.selectedCategory);
    }, [category.selectedCategory])

    useEffect(() => {
        setNextPage(nextPage + 1);
        setPageElements([...pageElements, ...elements]);
        setHasMore(elements.length > 0);
    }, [elements])

    const handleLoadMore = () => {
        fetchCategoryElements(nextPage, category.selectedCategory, orientation, size);
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
        fetchCategoryElements(nextPage, category.selectedCategory, event.target.value, size);
        setPageElements([]);
        console.log(event.target.value);
    };

    const optionSizeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSize(event.target.value);
        fetchCategoryElements(nextPage, category.selectedCategory,  orientation, event.target.value);
        setPageElements([]);
        console.log(fetchCategoryElements)
        console.log(event.target.value);
    };

    return (
        <>
            <Navigation />
            <div>
                <div className="container">
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {totalResults == 0 ? 
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
                        pageElements={pageElements}
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