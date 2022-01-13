import React from "react";
import FinnishWordComponent from "./FinnishWordComponent";
import "./UserComponent.css";
//User view when entering Finnish words
const FinnishUserComponent = () => {
  return (
    <div>
      <p className="instructions">
        Enter translations to the empty cells. Doubleclick to edit cell.
      </p>
      <FinnishWordComponent />
    </div>
  );
};

export default FinnishUserComponent;
