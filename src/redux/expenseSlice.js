import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            const { category, data } = action.payload;
            if (state.hasOwnProperty(category)) {
                state[category] = [...state[category], data];
            } else {
                state = { ...state, [category]: [data] };
            }
            return state;
        }
    }
})

export const { addExpense } = expenseSlice.actions
export default expenseSlice.reducer