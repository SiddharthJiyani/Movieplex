import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN; // import token from .env file
 

// set default header for all axios requests meaning that all requests will have this header
const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromAPI = async (url,params) =>{
    try{
        const data = await axios.get(BASE_URL+url,{
            headers,
            params
        });
        return data;
    }

    catch(e){
        console.log(e);
        return e;
    }
}