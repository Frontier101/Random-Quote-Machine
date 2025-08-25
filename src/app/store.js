import { configureStore } from "@reduxjs/toolkit";
import quotesReducer from '../features/quotesSlice'
import authorInfoReducer from "../features/authorInfoSlice";
import previousQReducer from "../features/previousQSlice";
import filtersReducer from "../features/filtersSlice";
import favoritesReducer from "../features/favoritesSlice";


export const store = configureStore({
    reducer:{
        quotes: quotesReducer,
        authorInfo: authorInfoReducer,
        previousQuotes: previousQReducer,
        filters: filtersReducer,
        favorites: favoritesReducer,
    }
});