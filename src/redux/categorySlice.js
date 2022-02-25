import { createSlice } from '@reduxjs/toolkit'

const initialState = ['Food', 'Transport', 'Bill']

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        add: (state, action) => {
            return state;
        }
    }
})

export const { addExpense } = categorySlice.actions
export default categorySlice.reducer