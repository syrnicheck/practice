import React, { useState, useEffect } from "react"
import { IPhoto } from "../models/IPhoto"
import "../styles/imageCard.css"
import axios from 'axios';
import fileDownload from 'js-file-download';
import saveIcon from "../assets/saveIcon.svg";
import downloadIcon from "../assets/downloadIcon.svg";
import likeIcon from "../assets/likeIcon.svg";
import dislikeIcon from "../assets/dislikeIcon.svg";

interface photoProps {
    photo: IPhoto
}

function download(url: string, filename: string) {
    axios.get(url, {
        responseType: 'blob',
    }).then(res => {
        fileDownload(res.data, filename);
    });

    console.log(url)
}

export function Photo({ photo }: photoProps) {
    const [isLiked, setIsLiked] = useState(false);


    const toggleLike = () => {
        try {
            const like = JSON.parse(localStorage.getItem('likes') || '{}');
            if (like[photo.id]) {
                delete like[photo.id];
                setIsLiked(false);
            } else {
                like[photo.id] = true;
                setIsLiked(true);
            }
            localStorage.setItem('likes', JSON.stringify(like));
        } catch (error) {
            console.error('Ошибка при работе с localStorage:', error);
        }
    };

    useEffect(() => {
        try {
            const like = JSON.parse(localStorage.getItem('likes') || '{}');
            setIsLiked(like[photo.id] || false);
        } catch (error) {
            console.error('Ошибка при работе с localStorage:', error);
        }
    }, [photo.id]);

    //const img_avatar_url = "https://images.pexels.com/users/avatars/"+photo.photographer_url.slice(23).replace(/\D/g,'');
    return (
        < >
            <div className="image-card">
                <div className="shadow">
                    <img className="image" src={photo.src.large} alt={photo.alt} />
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
                                <img className="avatar" src={photo.src.tiny} alt={photo.photographer} />
                                <a className="name" href={photo.photographer_url} target="_blank">{photo.photographer}</a>
                            </div>
                            <button className="image-button" onClick={() => download(photo.src.original, photo.id + ".jpeg")}>
                                <img src={downloadIcon} alt="download Icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ >
    )
}