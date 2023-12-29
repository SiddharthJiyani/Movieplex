import React from 'react'
import './style.scss'
import ContentWrapper from '../../compenents/contentWrapper/ContentWrapper'
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './casts/Cast';
import VideosSection from './videosSection/VideosSection';
import Similar from './carousel/Similar';
import Recommendation from './carousel/Recommendation';



const Details = () => {
  const {mediaType,id} = useParams() ;
  // console.log("called useParams:",useParams()) ;
  // ? with use params we will get media_type and id from the url which we have sent in carousel.js at line 79
  //<div key={item.id} className='carouselItem' onClick={ () => {navigate(`/${item.media_type}/${item.id}`)}}>
  const {data, loading}  = useFetch(`/${mediaType}/${id}/videos`) ;
  const {data:credits , loading:loadingCredits } = useFetch(`/${mediaType}/${id}/credits`) ;
  console.log("data",data) ;
  console.log("credits",credits) ;

  return (
    <div>
      <DetailsBanner  video={data?.data?.results[0]} crew={credits?.data?.crew}/>
      <Cast data={credits?.data?.cast }loading={loading}/>
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details