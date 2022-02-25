import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            return state;
        }
    }
})

export const { addExpense} = expenseSlice.actions
export default expenseSlice.reducer