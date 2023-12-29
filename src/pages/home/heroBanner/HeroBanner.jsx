import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../compenents/lazyLoadImage/Img";
import ContentWrappr from "../../../compenents/contentWrapper/ContentWrapper";
import ContentWrapper from "../../../compenents/contentWrapper/ContentWrapper";

const HeroBanner = () => {

  const bgArray = [
    "https://www.themoviedb.org/t/p/original/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg",
    "https://www.themoviedb.org/t/p/original/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg",
    "https://www.themoviedb.org/t/p/original/pqGraZZ1bpgZwyl8jCQuv8tlR1N.jpg",
    "https://www.themoviedb.org/t/p/original/tPwpc9Uo1Fly50urDxfGWWk7H77.jpg",
    "https://www.themoviedb.org/t/p/original/kVd3a9YeLGkoeR50jGEXM6EqseS.jpg",
    "https://www.themoviedb.org/t/p/original/9xfDWXAUbFXQK585JvByT5pEAhe.jpg"
  ]

  const [bgImage, setbgImage] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("movie/now_playing");
  useEffect(() => {
    const bg = url?.backdrop + data?.data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path  ;
    if(bg === "https://image.tmdb.org/t/p/originalnull" || url?.backdrop == undefined){
      setbgImage(bgArray[Math.floor(Math.random() * bgArray.length)]);
    }
    else{
      setbgImage(bg);
    }
    console.log("url.back=>",url);
    console.log(bg);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      // ^event.key -> when u press the key it will trigger the function
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="heroBanner">
      <div className="backdrop-img">
        <Img src={bgImage}></Img>
      </div>
      <div className="opacity-layer"></div>
      <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome to Movieplex.</span> <br />
            <span className="subtitle" style={{ fontFamily: "Dancing Script" , fontSize:"25px"  }}>Millions of movies, TV shows and people to discover. Explore now.</span>
            <div className="searchInput">
              <input
                type="text" 
                placeholder="Search for a movie, tv show..."
                onChange={(event) => setQuery(event.target.value)}
                onKeyUp={searchQueryHandler}
                // *onKeyUp -> when u release the key it will trigger the function
              />
              <button onClick={()=>{navigate(`/search/${query}`)}}>Search</button>
            </div>
          </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
