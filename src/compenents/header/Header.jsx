import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation(); // this is used to get the current location of the page

    useEffect(() => {
        window.scrollTo(0, 0);
    },[location])

    useEffect( () => {
        // this does that if i click anywhere on the screen the mobile menu will close
        document.addEventListener('click' , (e)=>{ 
            // console.log(e.target.className);
            if(e.target.id === "menuIcon" || e.target.id === "searchIcon" || e.target.id === "searchInput" ){
                console.log("use effect clicked")
                return;
            }
            else{
                setMobileMenu(false);
                setShowSearch(false);
            }
        })}
    ,[])

    const openSearch = ()=>{ 
        setMobileMenu(false);
        setShowSearch(!showSearch) ;
    }

    const closeMobileMenu = () => {
        console.log("close")
        setMobileMenu(false);
        setShowSearch(false) ;
    }

    const openMobileMenu = () => { 
        setMobileMenu(!mobileMenu);
        setShowSearch(false) ;
    }

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && event.target.value !== "") {
            navigate(`/search/${query}`);
        }
        // when we jump to another page search bar will be closed after 1 sec
        setTimeout(() => {
            setShowSearch(false);
        }, 1000);

    }

    const navigateHandler = (route)=>{
        if(route === "movies"){
            return ()=>{navigate(`/explore/movie`)}
        }
        else if(route === "tv"){
            return ()=>{navigate(`/explore/tv`)}
        }
    }

    const  controlNavbar = () => {
        // console.log(window.scrollY.toFixed(0));
        // console.log(lastScrollY.toFixed(0) , '--- ' , window.scrollY.toFixed(0));
        if(window.scrollY > 200){
            if(window.scrollY > lastScrollY  && mobileMenu === false){
                setShow("hide");
            } 
            else{
                setShow("show");
            }
        }
        setLastScrollY(window.scrollY);
        if(window.scrollY === 0){
            setShow("top");
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll", controlNavbar);
        return () =>{
            window.removeEventListener("scroll", controlNavbar);
        }
    },[lastScrollY])

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo">
                <img src={logo} alt="Logo" onClick={ () => { navigate(`/`)}} />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={navigateHandler('movies')}>Movies</li>
                    <li className="menuItem" onClick={navigateHandler('tv')}>Tv Shows</li>
                    <li className="menuItem">
                        <HiOutlineSearch id="searchIcon"  onClick={openSearch}/> {/* This is coming from react icons */}
                    </li>
                </ul>
                <div className="mobileMenuItems">
                    <HiOutlineSearch id="searchIcon" onClick={openSearch}/> 
                    {mobileMenu ? (<VscChromeClose onClick={closeMobileMenu}/>) : (<SlMenu id="menuIcon" onClick={openMobileMenu}/>)}
                </div>
            </ContentWrapper>
            { showSearch ? (
                <div className="searchBar" >
                <ContentWrapper>
                <div className="searchInput">
                    <input id="searchInput"
                        type="text"
                        placeholder="Search for a movie, tv show..."
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyUp={searchQueryHandler}
                    />
                    <VscChromeClose onClick={()=>setShowSearch(false)}/>
                </div>
                </ContentWrapper>
            </div>
            ) : ""}
        </header>
    );
};

export default Header;  