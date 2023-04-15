import React, { useState, useEffect, ChangeEvent } from "react";
import { useCategoryElements } from "../hooks/useCategoryElements";
import { Element } from '../components/Element';
import '../styles/mainPage.css';
import { useSelector } from "react-redux";
import { Navigation } from '../components/Navigation';
import { AppState } from "../models/model";
import { PhotoList } from "../components/PhotoList";


export function CategoryPage() {
    const { totalResults, elements, error, loading, fetchCategoryElements } = useCategoryElements();
    const [nextPage, setNextPage] = useState(1);
    const [pageElements, setPageElements] = useState(elements);
    const [hasMore, setHasMore] = useState(true);
    const [orientation, setOrientation] = useState("");
    const [size, setSize] = useState("");
    const category = useSelector((state: AppState) => state.category);


    useEffect(() => {
        setPageElements([])
        fetchCategoryElements(nextPage, category.selectedCategory, orientation, size)
    }, [category.selectedCategory])

    useEffect(() => {
        setNextPage(nextPage + 1);
        setPageElements([...pageElements, ...elements]);
        setHasMore(elements.length > 0);
    }, [elements])

    const handleLoadMore = () => {
        fetchCategoryElements( nextPage);
        console.log(nextPage)
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
                    <div className="category-page-title">{category.selectedCategory} Photos</div>
                    <div className="category-result">
                        <div className="search-results">Photos <span className="number">{formatNumber(Number(totalResults))} </span> </div>
                        <div className="filters">
                            <select className="filter" value={orientation} onChange={optionOrientationHandler}>
                                <option value="" selected>All Orientations</option>
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
                </div>
            </div>
        </>
    )
}