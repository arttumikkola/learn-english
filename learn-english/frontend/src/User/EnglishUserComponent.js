import React from "react";
import EnglishWordComponent from "./EnglishWordComponent";
import "./UserComponent.css";
//User view when entering English words
const EnglishUserComponent = () => {
  return (
    <div>
      <p className="instructions">
        Enter translations to the empty cells. Doubleclick to edit cell.
      </p>
      <EnglishWordComponent />
    </div>
  );
};

export default EnglishUserComponent;
