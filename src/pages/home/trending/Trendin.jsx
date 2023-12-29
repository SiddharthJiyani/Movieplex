import React, { useState } from 'react'
import ContentWrapper from '../../../compenents/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../compenents/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../compenents/carousel/Carousel';

const Trending = () => {

  // API Call
  // this is the end point to hit => /trending/{media_type}/{time_window} 
  // => media_type = all , movie , tv , person , time_window = day , week
  const [endpoint,setEndpoint] = useState("day");
  const {data , loading } = useFetch(`/trending/all/${endpoint}`) ;
  // console.log("data : ",data) ;

  const onTabChange = (tab) =>{
    setEndpoint(tab === "Day" ? "day" : "week") ;

  }

  return (
    <div className="carouselSection">
        <ContentWrapper >
            <span className="carouselTitle">Trending</span>
            <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.data?.results} loading={loading}/>
    </div>
  )
}

export default Trending