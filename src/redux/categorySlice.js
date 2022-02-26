import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentCategory :'All',
    categoryList:['Food', 'Transport', 'Bill']
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        addCategory: (state, action) => {
             state.categoryList = [...state.categoryList,action.payload];
             return state;
            },
        changeCurrentCategory: (state, action) => {
            // console.warn(action.payload+" "+state.currentCategory);
            state.currentCategory = action.payload;
            return state;
        }
    }
})

export const { addCategory, changeCurrentCategory } = categorySlice.actions
export default categorySlice.reducer