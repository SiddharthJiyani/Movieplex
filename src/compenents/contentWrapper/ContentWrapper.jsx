import React from "react";

import "./style.scss";

const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

// ^ Ye component saare content ko center me rakhne ke liye hai

export default ContentWrapper;
