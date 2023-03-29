import {Element} from '../components/Element';
import { useElements } from '../hooks/elements';
import '../styles/mainPage.css';

export function MainPage(){
    const {elements, error, loading } = useElements()
    console.log(elements)
    return (
        <div className="container">
            {loading && <p>Loading...</p>}
            {error && <p>{ error}</p>}
            <div className="photo-list">
                
                {elements.map(element => <Element element={element} key={element.id}/>)}
                
                {/* {elements.map(element => <Element element={element} key={element.id}/>)} */}
                {/* <Element element = {elements[0]} /> */}
            </div>
        </div>
    );
}