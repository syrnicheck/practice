import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';
import { ChangeEvent } from 'react';
import { setCategoryAction } from "../store/reducers/categoryReducer";
import { useDispatch } from "react-redux";
import { SEARCH_PAGE_URL } from "../constants/app";

const ENTER_BUTTON_KEYCODE = 13;

export function Input() {
    const [searchedCategory, setSearchedCategory] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const nameCategory = event.target.value;
        setSearchedCategory(nameCategory);
    };

    const pressEnterHandler = (event: any) => {
        if (event.keyCode === ENTER_BUTTON_KEYCODE) {
            search()
        }
    }

    const search = () => {
        dispatch(setCategoryAction(searchedCategory))
        navigate(SEARCH_PAGE_URL)
    };

    return (
        <div className="search">
            <input className="search-input" type="search" placeholder="Search for free photos"
                value={searchedCategory} onChange={inputHandler} onKeyDown={pressEnterHandler} />
            <button className="searchInput-button" onClick={search}>
                <svg className="loupe" viewBox="0 0 24 24" width="24" height="24" >
                    <svg fill="#7f7f7f" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" stroke="#7f7f7f"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M497.938,430.063l-126.914-126.91C389.287,272.988,400,237.762,400,200C400,89.719,310.281,0,200,0 C89.719,0,0,89.719,0,200c0,110.281,89.719,200,200,200c37.762,0,72.984-10.711,103.148-28.973l126.914,126.91 C439.438,507.313,451.719,512,464,512c12.281,0,24.563-4.688,33.938-14.063C516.688,479.195,516.688,448.805,497.938,430.063z M64,200c0-74.992,61.016-136,136-136s136,61.008,136,136s-61.016,136-136,136S64,274.992,64,200z"></path> </g> </g></svg>
                </svg>
            </button>
        </div>
    )
}