import { createSlice } from '@reduxjs/toolkit'

const initialState = ['Food', 'Transport', 'Bill']

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        addCategory: (state, action) => {
            return state;
        }
    }
})

export const { addCategory } = categorySlice.actions
export default categorySlice.reducer