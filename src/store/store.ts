import { configureStore } from '@reduxjs/toolkit';
import { categoryReducer } from './reducers/categoryReducer';

const initialState = {
  category: {
    selectedCategory: JSON.parse(localStorage.getItem('selectedCategory') || 'null')
  }
};

const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
  preloadedState: initialState 
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
