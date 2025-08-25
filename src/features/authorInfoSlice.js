import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAuthorInfo = createAsyncThunk(
    'quotes/fetchAuthorInfo',
    async (authorName, {rejectWithValue})=>{
        try {
            const res = await fetch('/data/authors.json');
            if(!res.ok) throw new Error('Network error!');
            const info = await res.json();
            console.log(info[authorName]);
            return info[authorName];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const authorInfoSlice = createSlice({
    name: 'authorInfo',
    initialState:{
        authorBio : {},
        status: 'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAuthorInfo.pending, (state)=>{
                state.status = 'loading';
            })
            .addCase(fetchAuthorInfo.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.authorBio = action.payload;
            })
            .addCase(fetchAuthorInfo.rejected, (state, action)=>{
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default authorInfoSlice.reducer;

