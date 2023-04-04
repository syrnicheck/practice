import { useEffect, useState } from 'react';
import { Element } from '../components/Element';
import { useElements } from '../hooks/useElements';
import { IElement } from '../models/IElement';
import '../styles/mainPage.css';

export function MainPage() {
    const { elements, error, loading, fetchElements } = useElements();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageElements, setPageElements] = useState(elements);
    const [isVisible, setIsVisible] = useState(false);

    const columnFirst = pageElements.filter((e, i) => i % 3 === 0);
    const columnSecond = pageElements.filter((e, i) => i % 3 === 1);
    const columnThird = pageElements.filter((e, i) => i % 3 === 2);
    console.log(columnFirst);

    useEffect(() => {
        fetchElements(currentPage)
    }, [currentPage])

    useEffect(() => {
        console.log(elements);
        console.log(pageElements);

        setPageElements([...pageElements, ...elements])
    }, [elements])

    const loadMore = () => {
        setCurrentPage(currentPage + 1);
    };

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
            const bottom = rect.bottom + window.pageYOffset;
            const visible = bottom - window.pageYOffset - window.innerHeight < 100;
            //console.log(top, window.innerHeight);
            console.log(bottom);
            console.log(visible);

            setIsVisible(visible);

        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    return (
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
    );
}