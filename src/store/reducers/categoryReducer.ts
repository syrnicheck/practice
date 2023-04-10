export const categoryReducer = (state: any = [], action: any) => {
    switch (action.type) {

        case 'SET_CATEGORY':
            return { ...state, selectedCategory: action.payload }
        default:
            return state;
    }
}

export const setCategoryAction = (payload: any) => ({ type: 'SET_CATEGORY', payload })