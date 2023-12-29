import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url :{} ,
    genres : {} 
  },
  reducers: {
    getApiConfig : (state , action) =>{
        state.url = action.payload; // whats this ? -> https://redux-toolkit.js.org/api/createSlice#mutable-updates
    },
    getGenres : (state , action) => {
        state.genres = action.payload;
    }
    
  },
});

// Action creators are generated for each case reducer function
export const { getApiConfig ,  getGenres } = homeSlice.actions;

export default homeSlice.reducer;
