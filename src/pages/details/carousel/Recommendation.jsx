import React from "react";

import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../compenents/carousel/Carousel";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );
    console.log("data-recc",data) ;

    if(data?.data?.results?.length > 0){
        return (
            <Carousel
                title="Recommendations"
                data={data?.data?.results}
                loading={loading}
                endpoint={mediaType}
            />
        );
    }
    else{
        return(
            <div></div>
        )
    }
};

export default Recommendation;