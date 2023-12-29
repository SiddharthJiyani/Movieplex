import React, { useState } from 'react'
import './style.scss'

const SwitchTabs = ({data , onTabChange}) => {

    const [selectedTab,setSelectedTab] = useState(0) ;
    const [left,setLeft] = useState(0) ;

    const activeTab = (tab,index) =>{
        console.log("index=",index,"selectedTab=",selectedTab , "tab=",tab) ;
        setLeft(index*100) ;
        setTimeout(() => {
            setSelectedTab(index)
        }, 300);
        onTabChange(tab, index) ;
        // tab = "Week" or "Day"
    }

    return (
        <div className='switchingTabs'>
            <div className="tabItems">
                {data.map((tab,index) =>(
                    <span 
                        key={index}
                        className={`tabItem ${selectedTab === index ? "active" : ""}`}
                        onClick={() => activeTab(tab,index)}
                    >
                        {tab}
                    </span>
                ) )}
                <span className="movingBg" style={{left}}></span>
            </div>
        </div>
    )
}

export default SwitchTabs