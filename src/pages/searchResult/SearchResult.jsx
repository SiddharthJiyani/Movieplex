import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromAPI } from "../../utils/api";
import MovieCard from "../../compenents/movieCard/MovieCard";
import Spinner from "../../compenents/spinner/Spinner";
import noResults from "../../assets/no-results.png";
import ContentWrapper from "../../compenents/contentWrapper/ContentWrapper";
// const SearchResult = () => {

//   const [data, setData] = useState(null);
//   const [pageNum, setPageNum] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const { query } = useParams();

//   const fetchInitialData = async () => {
//     setLoading(true);
//     fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`)
//     .then( ( res ) => {
//       setData(res.data);
//       setPageNum( (prev) => prev + 1);
//       setLoading(false);
//     })
//   }


//   const fetchNextPageData = () => {
//     fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then(
//         (res) => {
//           // console.log("fetchdata api result:",data) ;
//           if (data?.data?.results) {
//             console.log("ress==", res)
//               setData({
//                 ...data , 
//                     results: [...data?.data?.results, ...res?.data?.results],
//                 });
//             } else {
//               // console.log("ress.data==", res.data)
//                 setData(res);
//             }
//             setPageNum( (prev) => prev + 1);
//             // setLoading(false);
//         }
//     );
// };

// useEffect(() => {
//   fetchInitialData();
//   fetchNextPageData();
// },[query]) // jab bhi query change hoga tabhi useEffect chalega




//   return (
//     <div className="searchResultsPage">
//       { loading && <Spinner initial={true} />}
//       { !loading && (
//         <ContentWrapper>
//             {data?.data?.results?.length > 0 ? (
//               <>
//                 <div className="pageTitle">
//                   {`Search ${data?.data?.total_results > 1 ? "result" : "results"} of "${query}" `}
//                 </div>
//                 <InfiniteScroll 
//                   className="content"
//                   dataLength={data?.data?.results?.length || []}
//                   next={fetchNextPageData}
//                   // hasMore={pageNum <= data?.total_pages }
//                   hasMore={pageNum <= data?.data?.total_pages }
//                   loader={<Spinner />}
//                 >
//                   {data?.data?.results.map((item,index)=>{
//                     if(item?.media_type === "person") return ;
//                     return(
//                       <MovieCard key={index} data={item} fromSearch={true} ></MovieCard>
//                     )
//                   })}
//                 </InfiniteScroll>
//               </>
//             ) : 
//             (<span className="resultNotFound">Sorry, Results not found!</span>) }
//         </ContentWrapper>
//       )}
//     </div>
//   )
// }

// export default SearchResult



const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                setData(res?.data);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        );
    };

    const fetchNextPageData = () => {
      console.log("next page func called");
        fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
              // console.log("data?.results=",data)
                if (data?.results) {
                  // console.log("ddddaattaa",data)
                    setData({
                        ...data,
                        results: [...data?.results, ...res?.data?.results],
                    });
                } else {
                  // console.log("else ress.data==", res.data)
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    return (
        <div className="searchResultsPage">
            {loading && (<Spinner initial={true} />)}
            {!loading && (
                <ContentWrapper>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${
                                    data?.total_results > 1
                                        ? "results"
                                        : "result"
                                } of '${query}'`}
                            </div>
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            Sorry, Results not found!
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

export default SearchResult;
