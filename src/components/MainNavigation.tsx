import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/header.css';
import { SEARCH_PAGE_URL } from "../constants/app";
import { Input } from './Input';
import { usePhotoById } from "../hooks/usePhotoById.ts";
import { MAIN_PAGE_BACKGROUND_IDS, SUGGESTED_CATEGORIES } from "../constants/app";
import { Navigation } from "./Navigation";
import { useDispatch } from "react-redux";
import { setCategoryAction } from "../store/reducers/categoryReducer";
import logo from "../assets/logo.svg";


export function MainNavigation() {
    const { photo, error, loading, fetchPhotoById } = usePhotoById();
    const [isMainNavVisible, setIsMainNavVisible] = useState(true);
    const [randomCategories, setRandomCategories] = useState<string[]>([])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log('rerender')

    useEffect(() => {
        const randomId = MAIN_PAGE_BACKGROUND_IDS[Math.floor(Math.random() * MAIN_PAGE_BACKGROUND_IDS.length)]
        fetchPhotoById(randomId)

        const categories: string[] = [];
        while (categories.length < 7) {
            const randomIndex = getRandomNumber(0, SUGGESTED_CATEGORIES.length - 1);

            if (!categories.includes(SUGGESTED_CATEGORIES[randomIndex])) {
                categories.push(SUGGESTED_CATEGORIES[randomIndex]);
            }
        }
        setRandomCategories(categories)
    }, [])

    function getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    const search = (item: string) => {
        dispatch(setCategoryAction(item))
        navigate(SEARCH_PAGE_URL)
    };



    useEffect(() => {
        const handleScroll = () => {
            const photo = document.getElementById('main-navigation');
            if (!photo) {

                return;
            }
            const rect = photo.getBoundingClientRect();
            const visible = rect.top > -500;

            setIsMainNavVisible(visible);

        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, []);

    return (
        <>
            <Navigation isVisible={!isMainNavVisible} />
            <div className="main-navigation" id="main-navigation" style={{ backgroundImage: ` url(${photo?.src.landscape})` }}>
                <div className="container">
                    <div className="main-page-header">
                        <div className="header-inner">
                            <Link to="/" className="logo" >
                                <img src={logo} alt="logo" />
                            </Link>
                            <nav className="header-nav">
                                <Link className="link link-main-page" to="https://www.pexels.com/discover/" target="_blank">Explore</Link>
                                <Link className="link link-main-page" to="https://www.pexels.com/ru-ru/license/" target="_blank">Lisense</Link>
                                <Link className="link link-main-page" to={SEARCH_PAGE_URL}>Uplode</Link>

                                <button className="button">Join</button>
                            </nav>
                        </div>
                    </div>
                    <div className="main-page-information-container">
                        <div className="main-page-information">
                            <h1 className="main-page-text">The best free stock photos & videos shared by talented creators</h1>
                            <div className="main-input"><Input /></div>
                            <ul className="category-list">Suggested: {
                                randomCategories.map((item, index) => (
                                    <li className="category-item" key={index} onClick={() => search(item)}>
                                        <a>{item}</a>
                                    </li>
                                ))
                            }</ul>
                        </div>
                    </div>
                    <div className="main-page-photographer">
                        <a href={photo?.photographer_url} target="_blank">Photo by {photo?.photographer}</a>
                    </div>
                </div>
            </div>
        </>
    )
}

