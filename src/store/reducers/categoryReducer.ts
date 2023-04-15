export const categoryReducer = (state: any = { selectedCategory: null }, action: any) => {
    switch (action.type) {
      case 'SET_CATEGORY':
        // Сохраняем значение в localStorage перед обновлением состояния
        localStorage.setItem('selectedCategory', JSON.stringify(action.payload));
        return { ...state, selectedCategory: action.payload };
      default:
        return state;
    }
  };


  export const setCategoryAction = (payload: any) => ({ type: 'SET_CATEGORY', payload })