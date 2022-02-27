import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk'
import expenseSlice from './expenseSlice';
import categorySlice from './categorySlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: []
};

const reducers = combineReducers({
    expense: expenseSlice,
    category: categorySlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

const persistor = persistStore(store);
export { store, persistor };