import React, { useState } from "react";

const ForColor = () => {
  const [color, setColor] = useState("");
  return (
    <div>
      <div className="showcolordev" style={{ backgroundColor: color }}>
        {color ? color : "Empty value"}
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          id="colorinput"
          placeholder="Enter the color code"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </form>
    </div>
  );
};

export default ForColor;
