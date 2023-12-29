import React, { useState } from 'react'
import ContentWrapper from '../../../compenents/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../compenents/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../compenents/carousel/Carousel';

const TopRated = () => {

  // API Call
  // this is the end point to hit => /trending/{media_type}/{time_window} 
  // => media_type = all , movie , tv , person , time_window = day , week
  const [endpoint,setEndpoint] = useState("movie");
  const {data , loading } = useFetch(`/${endpoint}/top_rated`) ;
  // console.log("api data : ",data) ;

  const onTabChange = (tab) =>{
    // console.log("tab=>",tab);
    setEndpoint(tab === "Movies" ? "movie" : "tv") ;
  }

  return (
    <div className="carouselSection">
        <ContentWrapper >
            <span className="carouselTitle">Top-Rated</span>
            <SwitchTabs data={["Movies","TV-Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default TopRated