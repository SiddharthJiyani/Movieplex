import React, { useState } from "react";

import Carousel from "../../../compenents/carousel/Carousel";
import ContentWrapper from "../../../compenents/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../compenents/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";

const Popular = () => {
    const [endpoint, setEndpoint] = useState('movie');


    const { data, loading } = useFetch(`/${endpoint}/popular`);
    // console.log("end ", endpoint)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
        // console.log("endpt: ", endpoint)
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">What's Popular</span>
                <SwitchTabs
                    data={["Movies", "TV Shows"]}
                    onTabChange={onTabChange}
                />
            </ContentWrapper>
            <Carousel
                data={data?.data?.results}
                loading={loading}
                endpoint={endpoint}
            />
        </div>
    );
};

export default Popular;