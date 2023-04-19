import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';
import { ChangeEvent } from 'react';
import { setCategoryAction } from "../store/reducers/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_PAGE_URL, HOME_PAGE_URL } from "../constants/app";
import { AppState } from "../models/model";
import searchIcon from "../assets/searchIcon.svg";

const ENTER_BUTTON_KEYCODE = 13;

export function Input() {
    const category = useSelector((state: AppState) => state.category)
    const [searchedCategory, setSearchedCategory] = useState(category.selectedCategory);

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

        if (searchedCategory === "") {
            navigate(HOME_PAGE_URL);
            dispatch(setCategoryAction(searchedCategory));
        } else {
            dispatch(setCategoryAction(searchedCategory));
            window.location.reload();
            navigate(SEARCH_PAGE_URL);
        }
    };

    return (
        <div className="search">
            <input className="search-input" type="search" placeholder="Search for free photos"
                value={searchedCategory} onChange={inputHandler} onKeyDown={pressEnterHandler} />
            <button className="searchInput-button" onClick={search}>
                <img src={searchIcon} alt="Search Icon" />
            </button>
        </div>
    )
}