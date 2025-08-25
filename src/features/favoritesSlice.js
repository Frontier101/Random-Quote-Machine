import { createSlice } from "@reduxjs/toolkit";


const favoritesSlice = createSlice({
    name:'favorites',
    initialState : JSON.parse(localStorage.getItem('favorites') || '[]'),
    reducers:{
        addToFavorites:(state, action)=>{
            state.push(action.payload);
            localStorage.setItem('favorites', JSON.stringify(state));
        },
        removeFromFavorites:(state, action)=>{
            let index = 0;
            for(let i = 0; i< state.length; i++){
                if(state[i].quote == action.payload){
                    index = i;
                    break;
                }
            }
            state.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(state));
        }
    }
})

export const {addToFavorites, removeFromFavorites} = favoritesSlice.actions;
export default favoritesSlice.reducer;