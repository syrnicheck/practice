import React, {useState} from "react"
import { IElement } from "../models"


interface ElementProps {
    element: IElement
}

export function Element ({element}: ElementProps){
    const [details, setDetails] = useState(false);

    return (
        <div>
            <img className="image" src={element.src.medium} 
             alt={element.alt}  onClick={() => setDetails(true)}/>
            {element.alt}
            {details && <div>
                <button onClick={() => setDetails(false)}> Закрыть </button>
                <img src={element.src.medium} alt={element.alt} />
                
            </div>}
            
        </div> 
    )
}