import React, { useState, useEffect } from "react"
import { IElement } from "../models/IElement"
import "../styles/imageCard.css"
import axios from 'axios';
import fileDownload from 'js-file-download';
import saveIcon from "../assets/saveIcon.svg";
import downloadIcon from "../assets/downloadIcon.svg";
import likeIcon from "../assets/likeIcon.svg";
import dislikeIcon from "../assets/dislikeIcon.svg";

interface ElementProps {
    element: IElement
}

function download(url: string, filename: string) {
    axios.get(url, {
        responseType: 'blob',
    }).then(res => {
        fileDownload(res.data, filename);
    });

    console.log(url)
}

export function Element({ element }: ElementProps) {
    const [isLiked, setIsLiked] = useState(false);


    const toggleLike = () => {
        const like = JSON.parse((localStorage.getItem('likes')) || '');

        if (like[element.id]) {
            delete like[element.id]
            setIsLiked(false)
        } else {
            like[element.id] = true;
            setIsLiked(true);
        }
        localStorage.setItem('likes', JSON.stringify(like));

    };

    useEffect(() => {
        const like = JSON.parse((localStorage.getItem('likes')) || '');
        setIsLiked(like[element.id] || false);
    }, [element.id]);

    //const img_avatar_url = "https://images.pexels.com/users/avatars/"+element.photographer_url.slice(23).replace(/\D/g,'');
    return (
        < >
            <div className="image-card">
                <div className="shadow">
                    <img className="image" src={element.src.large} alt={element.alt} />
                    <div className="image-information">
                        <div className="information-header">
                            <button className="image-button save-button" >
                                <img src={saveIcon} alt="Save Icon" />
                            </button>
                            <button className="image-button like-button" id="like" onClick={toggleLike}>
                                {isLiked ?
                                    <img src={likeIcon} alt="like Icon" />
                                    :
                                    <img src={dislikeIcon} alt=" dislike Icon" />
                                }
                            </button>
                        </div>
                        <div className="information-footer">
                            <div className="photographer">
                                <img className="avatar" src={element.src.tiny} alt={element.photographer} />
                                <a className="name" href={element.photographer_url} target="_blank">{element.photographer}</a>
                            </div>
                            <button className="image-button" onClick={() => download(element.src.original, element.id + ".jpeg")}>
                                <img src={downloadIcon} alt="download Icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ >
    )
}