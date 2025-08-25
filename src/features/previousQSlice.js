import { createSlice } from "@reduxjs/toolkit";

const previousQSlice = createSlice({
    name:'previousQuotes',
    initialState:[],
    reducers:{
        addQuote: (state, action) => {
            if(!state.some(quoteList => 
                quoteList.quote == action.payload.quote)
            ){
                state.unshift(action.payload);
            }
        },
        removeLastQuote: (state) =>{
            state.shift();
        },
        clear: (state)=>{
            state.length = 0;
        }
    }
});

export const {addQuote, removeLastQuote, clear} = previousQSlice.actions;

export default previousQSlice.reducer;