import React from "react";

const Loading: React.FC = () => {
  return (
    <div id="loading-overlay">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
