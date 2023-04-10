import React, { useState, useEffect } from "react";
import { useCategoryElements } from "../hooks/useCategoryElements";
import { Element } from '../components/Element';
import '../styles/mainPage.css';
import { useSelector } from "react-redux";


interface AppState {
    category: {
        selectedCategory: string;
    }; // Replace with the actual type of 'category'
    // Add other properties for other parts of your state
  }

export function CategoryPage() {
    const { elements, error, loading, fetchCategoryElements } = useCategoryElements();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageElements, setPageElements] = useState(elements);
    const [isVisible, setIsVisible] = useState(false);
    const category = useSelector((state:  AppState)  => state.category)
    console.log(category)


    const columnFirst = pageElements.filter((e, i) => i % 3 === 0);
    const columnSecond = pageElements.filter((e, i) => i % 3 === 1);
    const columnThird = pageElements.filter((e, i) => i % 3 === 2);

    useEffect(() => {
        fetchCategoryElements(category.selectedCategory, currentPage)
    }, [ currentPage])

    useEffect(() => {
        setPageElements([])
        fetchCategoryElements(category.selectedCategory, currentPage)
    },[category.selectedCategory])

    useEffect(() => {
        console.log(elements);
        console.log(pageElements);

        setPageElements([...pageElements, ...elements])
    }, [elements])

    useEffect(() => {
        if (isVisible) {
            setCurrentPage(currentPage + 1);
        }
    }, [isVisible])


    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('infinity-scroll');
            if (!element) {
                console.log('return');
                return;
            }
            const rect = element.getBoundingClientRect();
            console.log(rect);
            console.log(window.pageYOffset);
            // const top = rect.top + window.pageYOffset;
            //const visible = top < window.innerHeight && bottom >= 0;
            //const bottom = rect.bottom + window.pageYOffset;
            const visible = rect.bottom - window.innerHeight < 100;
            //console.log(top, window.innerHeight);
            console.log(visible);

            setIsVisible(visible);

        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div>
            <div className="container">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <div className="photo-list" id="infinity-scroll">
                    <div className="column">
                        {columnFirst.map(element => <Element element={element} key={element.id} />)}
                    </div>
                    <div className="column">
                        {columnSecond.map(element => <Element element={element} key={element.id} />)}
                    </div>
                    <div className="column">
                        {columnThird.map(element => <Element element={element} key={element.id} />)}
                    </div>

                    {/* {elements.map(element => <Element element={element} key={element.id}/>)} */}
                    {/* <Element element = {elements[0]} /> */}
                </div>
                {/* <button id="infinity-scroll" onClick={loadMore}>LOAD MORE</button> */}
            </div>
        </div>
    )
}