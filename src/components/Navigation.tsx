import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/header.css';
import { SEARCH_PAGE_URL } from "../constants/app";
import { ChangeEvent } from 'react';
import { useCategoryElements } from "../hooks/useCategoryElements";

const ENTER_BUTTON_KEYCODE = 13;

export function Navigation() {
 
    const [searchedCategory, setSearchedCategory] = useState("house");

    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const nameCategory = event.target.value;
        setSearchedCategory(nameCategory);
    };

    const pressEnterHandler = (event: any) => {
        if (event.keyCode === ENTER_BUTTON_KEYCODE) {
            
       
            
        }
    }

    const search = () => {



    };

    
    return (
        <header className="navigation">
            <div className="container">
                <div className="header">
                    <div className="header-inner">
                        <Link to="/" className="logo" >
                            <svg width="130" height="50" className="DisplayNone_desktop-oversized__OPqkZ spacing_noMargin__Q_PsJ spacing_oversized-margin-right-50__Z6BXP spacing_desktop-margin-right-30__C4NEG spacing_mobile-margin-right-15__uM70E spacing_tablet-margin-right-15__zeT1z" viewBox="0 0 130.318 50"><g transform="translate(-3894 2762)"><rect width="50" height="50" rx="8" transform="translate(3894 -2762)" fill="#07a081"></rect><path d="M32.671,44.73h7.091V37.935H41.9a5.657,5.657,0,1,0,0-11.314H32.671Zm10.763,3.622H29V23H41.9a9.271,9.271,0,0,1,1.53,18.435Z" transform="translate(3880 -2773)" fill="#fff"></path><path d="M1.694,0h2.6V-6.16H7.656a6.579,6.579,0,0,0,2.915-.616,4.639,4.639,0,0,0,1.969-1.76,5.1,5.1,0,0,0,.7-2.728,5.146,5.146,0,0,0-.7-2.75,4.639,4.639,0,0,0-1.969-1.76,6.579,6.579,0,0,0-2.915-.616H1.694Zm2.6-8.47v-5.61H7.722a3.03,3.03,0,0,1,2.134.748,2.641,2.641,0,0,1,.814,2.046A2.684,2.684,0,0,1,9.856-9.24a2.978,2.978,0,0,1-2.134.77ZM20.372.264a5.925,5.925,0,0,0,3.179-.836,4.64,4.64,0,0,0,1.9-2.112l-2.024-.99a3.73,3.73,0,0,1-1.2,1.243,3.29,3.29,0,0,1-1.837.5A3.458,3.458,0,0,1,18-2.827a3.433,3.433,0,0,1-1.1-2.409H25.74a3.34,3.34,0,0,0,.088-.572q.022-.308.022-.594a6.154,6.154,0,0,0-.671-2.849,5.361,5.361,0,0,0-1.936-2.112,5.61,5.61,0,0,0-3.069-.8,5.7,5.7,0,0,0-3,.8,5.773,5.773,0,0,0-2.1,2.2,6.476,6.476,0,0,0-.77,3.179A6.482,6.482,0,0,0,15.081-2.8,5.9,5.9,0,0,0,17.226-.561,5.958,5.958,0,0,0,20.372.264Zm-.2-10.34a3,3,0,0,1,2.112.792,2.9,2.9,0,0,1,.924,2.068H16.94a3.313,3.313,0,0,1,1.122-2.112A3.208,3.208,0,0,1,20.174-10.076ZM26.422,0h2.926l2.706-3.982L34.738,0h2.926L33.506-5.962l4.18-5.94H34.76L32.054-7.964,29.348-11.9H26.422l4.158,5.94ZM44.088.264a5.925,5.925,0,0,0,3.179-.836,4.64,4.64,0,0,0,1.9-2.112l-2.024-.99a3.73,3.73,0,0,1-1.2,1.243,3.29,3.29,0,0,1-1.837.5,3.458,3.458,0,0,1-2.4-.891,3.433,3.433,0,0,1-1.1-2.409h8.844a3.34,3.34,0,0,0,.088-.572q.022-.308.022-.594A6.154,6.154,0,0,0,48.9-9.251a5.361,5.361,0,0,0-1.936-2.112,5.61,5.61,0,0,0-3.069-.8,5.7,5.7,0,0,0-3,.8,5.773,5.773,0,0,0-2.1,2.2,6.476,6.476,0,0,0-.77,3.179A6.482,6.482,0,0,0,38.8-2.8,5.9,5.9,0,0,0,40.942-.561,5.958,5.958,0,0,0,44.088.264Zm-.2-10.34A3,3,0,0,1,46-9.284a2.9,2.9,0,0,1,.924,2.068h-6.27a3.313,3.313,0,0,1,1.122-2.112A3.208,3.208,0,0,1,43.89-10.076ZM51.546,0h2.486V-16.654H51.546ZM60.9.264a5.6,5.6,0,0,0,2.321-.451,3.635,3.635,0,0,0,1.551-1.254,3.21,3.21,0,0,0,.55-1.859,3.088,3.088,0,0,0-.792-2.123A4.635,4.635,0,0,0,62.26-6.732L60.324-7.3a4.436,4.436,0,0,1-1.034-.484,1.023,1.023,0,0,1-.484-.924,1.212,1.212,0,0,1,.484-1.012,2.068,2.068,0,0,1,1.3-.374,3.005,3.005,0,0,1,1.705.506A2.944,2.944,0,0,1,63.4-8.228l1.914-.9a4.344,4.344,0,0,0-1.8-2.233,5.337,5.337,0,0,0-2.9-.8,5.1,5.1,0,0,0-2.178.451,3.7,3.7,0,0,0-1.518,1.243,3.2,3.2,0,0,0-.55,1.87,3.1,3.1,0,0,0,.759,2.09,4.624,4.624,0,0,0,2.3,1.32l1.87.528a3.923,3.923,0,0,1,1.078.473,1.057,1.057,0,0,1,.506.957,1.259,1.259,0,0,1-.55,1.078,2.391,2.391,0,0,1-1.43.4,3.2,3.2,0,0,1-1.881-.594A4.049,4.049,0,0,1,57.684-3.96l-1.914.9a4.774,4.774,0,0,0,1.925,2.42A5.7,5.7,0,0,0,60.9.264Z" transform="translate(3959 -2728)" fill="#000"></path></g></svg>

                        </Link>
                        <div className="search">
                            <input className="search-input" type="search" placeholder="Search for free photos"
                                value={searchedCategory} onChange={inputHandler} onKeyDown={pressEnterHandler} />
                            <button className="searchInput-button" onClick={search}>
                                <svg className="loupe" viewBox="0 0 24 24" width="24" height="24" >
                                    <svg fill="#7f7f7f" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" stroke="#7f7f7f"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M497.938,430.063l-126.914-126.91C389.287,272.988,400,237.762,400,200C400,89.719,310.281,0,200,0 C89.719,0,0,89.719,0,200c0,110.281,89.719,200,200,200c37.762,0,72.984-10.711,103.148-28.973l126.914,126.91 C439.438,507.313,451.719,512,464,512c12.281,0,24.563-4.688,33.938-14.063C516.688,479.195,516.688,448.805,497.938,430.063z M64,200c0-74.992,61.016-136,136-136s136,61.008,136,136s-61.016,136-136,136S64,274.992,64,200z"></path> </g> </g></svg>
                                </svg>
                            </button>
                        </div>
                        <nav className="header-nav">
                            <Link className="link" to={SEARCH_PAGE_URL}>Explore</Link>
                            <Link className="link" to="https://www.pexels.com/ru-ru/license/" target="_blank">Lisense</Link>
                            <Link className="link" to={SEARCH_PAGE_URL}>Uplode</Link>
                            <svg className="link" fill="#4a4a4a" width="30px" height="30px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" stroke="#4a4a4a" transform="rotate(90)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M8 2.5a1.22 1.22 0 0 1 1.25 1.17A1.21 1.21 0 0 1 8 4.84a1.21 1.21 0 0 1-1.25-1.17A1.22 1.22 0 0 1 8 2.5zm0 8.66a1.17 1.17 0 1 1-1.25 1.17A1.21 1.21 0 0 1 8 11.16zm0-4.33a1.17 1.17 0 1 1 0 2.34 1.17 1.17 0 1 1 0-2.34z"></path></g></svg>
                            <button className="button">Join</button>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

