import {Route, Routes} from 'react-router-dom'
import { Navigation } from './components/Navigation';
import { HOME_PAGE_URL,  SEARCH_PAGE_URL} from './constants/app';
import { CategoryPage } from './pages/CategoryPage';
import { MainPage } from './pages/MainPage';

function App() {
  return(
    <>
    <Navigation/>
    <Routes>
      <Route path={HOME_PAGE_URL} element={<MainPage/>}/>
      <Route path={SEARCH_PAGE_URL} element={<CategoryPage/>}/>
    </Routes>
    </>
  )
}

export default App;