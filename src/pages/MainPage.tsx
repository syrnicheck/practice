import { useEffect, useState } from 'react';
import { Element } from '../components/Element';
import { useElements } from '../hooks/useElements';
import '../styles/mainPage.css';
import throttle from '../utils/throttle'
import { THROTTLING_SCROLL_TIME_MS } from '../constants/app';


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

    useEffect(() => {
        if (isVisible) {
            setCurrentPage(currentPage + 1);
        }
    }, [isVisible])

    useEffect(() => {
        const onScroll = () => {
            const element = document.getElementById('infinity-scroll');
            if (!element) {
                console.log('return');
                return;
            }
            const rect = element.getBoundingClientRect();
            console.log(rect);
            console.log(window.pageYOffset);
            const visible = rect.bottom - window.innerHeight < 100;
            console.log(visible);

            setIsVisible(visible);

        }
        const handleScroll = throttle(onScroll, THROTTLING_SCROLL_TIME_MS)
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
            </div>
        </div>
    );
}