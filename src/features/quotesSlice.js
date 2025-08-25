import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const colors= [
    "#333333","#2C3539","#191970","#14213D",
    "#014421","#3B3C36","#800020","#4B0082",
    "#002B36","#381819","#0D47A1","#00695C",
    "#AD1457","#6A1B9A","#C62828","#283593",
    "#00838F","#7B1FA2","#D84315","#37474F" 
]

export const fetchQuotes = createAsyncThunk(
    'quotes/fetchQuotes',
    async ({category= '', author= ''}, {rejectWithValue})=>{
        try {
            const res = await fetch(`${import.meta.env.BASE_URL}data/quotes.json`);
            if(!res.ok) throw new Error('Network error!')
            const quotes = await res.json();

            // filter quotes based on category and author if provided
            if(category == 'All') category = '';

            
            const filteredQuotes = quotes.filter(quote => 
                (category ? quote.category == category : true) && 
                (author ? quote.author == author : true)
            );

            return (filteredQuotes[
                Math.floor(Math.random() * filteredQuotes.length)
            ] || {quote:'', author:'', category:''})
            
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const quotesSlice = createSlice({
    name: 'quotes',
    initialState: {
        quotesList : {quote:'', author:'', category:''},
        color: colors[Math.floor(Math.random() * colors.length)],
        status: 'idle',
        error: null,
    },
    reducers:{
        getRandomFavorite:(state, action)=>{
            const filtered = action.payload.listOfQuotes.filter(quote =>
                action.payload.category 
                ? quote.category == action.payload.category
                : true
            );
            state.quotesList = filtered[
                Math.floor(Math.random() * filtered.length)
            ] || {quote: '', author:'', category:''};
            state.color = colors[Math.floor(Math.random() * colors.length)]
        },
        getLastQuote:(state,action)=>{
            state.quotesList = action.payload[0];
            state.color = colors[Math.floor(Math.random() * colors.length)];
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchQuotes.pending, (state)=>{
                state.status = 'loading';
            })
            .addCase(fetchQuotes.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.quotesList = action.payload;
                state.color = colors[Math.floor(Math.random() * colors.length)]
            })
            .addCase(fetchQuotes.rejected, (state, action)=>{
                state.status = 'failed';
                state.error = action.error.message;
                state.quotesList = {quote: '', author:'', category:''};
            })
    }
})

export const { getRandomFavorite, getLastQuote } = quotesSlice.actions;
export default quotesSlice.reducer;