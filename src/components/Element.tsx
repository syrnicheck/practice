import React, { useState, useEffect } from "react"
import { IElement } from "../models/IElement"
import "../styles/imageCard.css"
import axios from 'axios';
import fileDownload from 'js-file-download';

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
                                <svg className="spacing_noMargin__Q_PsJ" viewBox="0 0 24 24" width="24" height="24">
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.89 5.87988H5.10999C3.39999 5.87988 2 7.27987 2 8.98987V20.3499C2 21.7999 3.04 22.4199 4.31 21.7099L8.23999 19.5199C8.65999 19.2899 9.34 19.2899 9.75 19.5199L13.68 21.7099C14.95 22.4199 15.99 21.7999 15.99 20.3499V8.98987C16 7.27987 14.6 5.87988 12.89 5.87988Z" stroke="#7f7f7f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16 8.98987V20.3499C16 21.7999 14.96 22.4099 13.69 21.7099L9.76001 19.5199C9.34001 19.2899 8.65999 19.2899 8.23999 19.5199L4.31 21.7099C3.04 22.4099 2 21.7999 2 20.3499V8.98987C2 7.27987 3.39999 5.87988 5.10999 5.87988H12.89C14.6 5.87988 16 7.27987 16 8.98987Z" stroke="#7f7f7f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z" stroke="#7f7f7f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </svg>
                            </button>
                            <button className="image-button like-button" id="like" onClick={toggleLike}>
                                {isLiked ?
                                    <svg className="spacing_noMargin__Q_PsJ" viewBox="0 0 24 24" width="24" height="24">
                                        <svg fill="#cb0b0b" width="24px" height="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#cb0b0b"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M26.996 12.898c-.064-2.207-1.084-4.021-2.527-5.13-1.856-1.428-4.415-1.69-6.542-.132-.702.516-1.359 1.23-1.927 2.168-.568-.938-1.224-1.652-1.927-2.167-2.127-1.559-4.685-1.297-6.542.132-1.444 1.109-2.463 2.923-2.527 5.13-.035 1.172.145 2.48.788 3.803 1.01 2.077 5.755 6.695 10.171 10.683l.035.038.002-.002.002.002.036-.038c4.415-3.987 9.159-8.605 10.17-10.683.644-1.323.822-2.632.788-3.804z"></path></g></svg>
                                    </svg>
                                    :
                                    <svg className="spacing_noMargin__Q_PsJ" viewBox="0 0 24 24" width="24" height="24">
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#7f7f7f"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Heart_02"> <path id="Vector" d="M19.2373 6.23731C20.7839 7.78395 20.8432 10.2727 19.3718 11.8911L11.9995 20.0001L4.62812 11.8911C3.15679 10.2727 3.21605 7.7839 4.76269 6.23726C6.48961 4.51034 9.33372 4.66814 10.8594 6.5752L12 8.00045L13.1396 6.57504C14.6653 4.66798 17.5104 4.51039 19.2373 6.23731Z" stroke="#7f7f7f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                                    </svg>
                                }
                            </button>
                        </div>
                        <div className="information-footer">
                            <div className="photographer">
                                <img className="avatar" src={element.src.tiny} alt={element.photographer} />
                                <a className="name" href={element.photographer_url} target="_blank">{element.photographer}</a>
                            </div>
                            <button className="image-button" onClick={() => download(element.src.original, element.id + ".jpeg")}>
                                <svg className="spacing_noMargin__Q_PsJ" viewBox="0 0 24 24" width="24" height="24">
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 15V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18L4 15M8 11L12 15M12 15L16 11M12 15V3" stroke="#7f7f7f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ >
    )
}