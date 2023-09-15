import React from "react";

const Footer = ({ length }) => {
  return <div className="bg-themeGreen p-4 rounded-sm font-bold capitalize grow md:grow-0 text-center">{length} {length <= 1 ? "item" : "items"} left</div>;
};

export default Footer;
