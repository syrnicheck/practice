import { Link } from "react-router-dom";
import '../styles/header.css';
import { SEARCH_PAGE_URL } from "../constants/app";
import { Input } from './Input';
import logo from "../assets/logoBlack.svg";


export function Navigation({ isVisible = true }) {

    return (
        <header className={`navigation ${isVisible ? 'navigation-visible' : 'navigation-hiden'}`} >
            <div className="container">
                <div className="header">
                    <div className="header-inner">
                        <Link to="/" className="logo" >
                            <img src={logo} alt="logo" />
                        </Link>
                        <Input />
                        <nav className="header-nav">
                            <Link className="link" to="https://www.pexels.com/discover/" target="_blank">Explore</Link>
                            <Link className="link" to="https://www.pexels.com/ru-ru/license/" target="_blank">Lisense</Link>
                            <Link className="link" to={SEARCH_PAGE_URL}>Uplode</Link>
                            <button className="button">Join</button>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

