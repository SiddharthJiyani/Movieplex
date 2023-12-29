import React from 'react'
import './style.scss'
import { useSelector } from 'react-redux'

useSelector
const Genres = ({data}) => { // here data is the array of genres ids also jo jo yaha likehenge wo props me aayega jaha ye component use hoga
    // console.log("gen-data :",data);
    const {genres} = useSelector((state) => state.home) ; // ye state.home wala home slice ka name hai jo ki store me define kiya tha   
    return (
    <div className="genres">
        {data?.map( (g) => {
            if( !genres[g]?.name ) return ;  // agar genres[g] nahi hai to null return kardo
            // console.log(genres[g].name) ;
            return(
                <div key={g} className="genre">
                    {genres[g]?.name}
                </div>
            )
        })}
    </div>
  )
}

export default Genres