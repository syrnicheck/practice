import {Element} from '../components/Element';
import { useElements } from '../hooks/elements';

export function MainPage(){
    const {elements, error, loading } = useElements()

    return (
      <div className="container">
        {loading && <p>Loading...</p>}
        {error && <p>{ error}</p>}
        {elements.map(element => <Element element={element} key={element}/>)}
        {/* {elements.map(element => <Element element={element} key={element.id}/>)} */}
      
        {/* <Element element = {elements[0]} /> */}
      </div>
    );
}