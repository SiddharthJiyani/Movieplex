import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import HomeSlice, { getApiConfig, getGenres } from "../store/homeSlice";
import Home from "./pages/home/Home";
import Footer from "./compenents/footer/Footer";
import Header from "./compenents/header/Header";
import PageNotFound from "./pages/404/pageNotFound";
import Explore from "./pages/explore/explore";
import Details from "./pages/details/details";
import SearchResult from "./pages/searchResult/searchResult";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  // console.log(url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = async () => {
    const data = await fetchDataFromAPI("/configuration") // movie/popular is the endpoint of the api
      .then((res) => {
        // console.log(res);
        const url = {
          backdrop: res.data.images.secure_base_url + "original",
          poster: res.data.images.secure_base_url + "original",
          profile: res.data.images.secure_base_url + "original",
        };
        // console.log("url : ") ;
        // console.log(url) ;
        dispatch(getApiConfig(url));
      });
    // console.log(data);
  };

  const genresCall = async () => {
    let promise = [];
    let endPoints = ["movie", "tv"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promise.push(fetchDataFromAPI(`/genre/${url}/list`));
    });

    const response = await Promise.all(promise);
    // console.log("res", response);
    response.map(({data}) => {
      return (data.genres).map((item)=>{allGenres[item.id] = item})
    })
    // console.log("gene",allGenres);
    dispatch(getGenres(allGenres)) ;
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
