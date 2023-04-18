export const categoryReducer = (state: any = { selectedCategory: null }, action: any) => {
  switch (action.type) {
      case 'SET_CATEGORY':
          try {
              localStorage.setItem('selectedCategory', JSON.stringify(action.payload));
          } catch (error) {
              console.error('Ошибка при работе с localStorage:', error);
          }
          return { ...state, selectedCategory: action.payload };
      default:
          return state;
  }
};

export const setCategoryAction = (payload: any) => {
  try {
      return { type: 'SET_CATEGORY', payload: JSON.parse(payload) };
  } catch (error) {
      console.error('Ошибка при разборе JSON:', error);
      return { type: 'SET_CATEGORY', payload };
  }
};