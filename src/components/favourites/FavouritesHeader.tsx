import React from "react";

interface Props {
  onClose: () => void;
}

const FavouritesHeader: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="favourites-header">
      <h3 tabIndex={0}>Favourite cities</h3>
      <button
        id="close-favourites"
        onClick={onClose}
        tabIndex={0}
        aria-label="Close the panel"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default FavouritesHeader;
