import React from "react";
import { Link } from "react-router-dom";

export function Navigation(){
    return(
        <nav className="navigation">
            <span>Pexels</span>
            <span>
                <Link to="/">Main</Link>
                <Link to="/search">Search</Link>
            </span>
        </nav>
    )
}