import { createSlice } from "@reduxjs/toolkit";


const filtersSlice = createSlice({
    name: 'filters',
    initialState:{
        category: '',
        order: '',
    },
    reducers:{
        setCategory :(state, action)=>{
            state.category = action.payload.filter.replace('All', '');
        },
        setOrder : (state, action)=>{
            const val = action.payload.filter;
            if(val == 'Random'){
                state.order = '';
            }else if(val == 'Same Author'){
                state.order = action.payload.author || '-';
            }else{
                state.order = val;
            }
        }
    }
})

export const {setCategory, setOrder} = filtersSlice.actions;
export default filtersSlice.reducer;