import { configureStore } from '@reduxjs/toolkit';
import { categoryReducer } from './reducers/categoryReducer';

const initialState = {
  category: {
    selectedCategory: null
  }
};

try {
  const storedCategory = localStorage.getItem('selectedCategory');
  if (storedCategory) {
    initialState.category.selectedCategory = JSON.parse(storedCategory);
  }
} catch (error) {
  console.error('Ошибка при работе с localStorage:', error);
}

const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
  preloadedState: initialState 
});

export type RootState = ReturnType<typeof store.getState>;

export default store;