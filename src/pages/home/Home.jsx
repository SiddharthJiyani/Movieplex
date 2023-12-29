import React from 'react'
import './style.scss'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trendin'
import Carousel from '../../compenents/carousel/Carousel'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'

function Home() {
  return (
    <div>
      <HeroBanner/>
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
  )
}

export default Home