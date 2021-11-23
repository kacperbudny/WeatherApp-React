import React from "react";

interface Props {
  showFavouritesPanel: () => void;
}

const OpenFavouritesButton: React.FC<Props> = ({ showFavouritesPanel }) => {
  return (
    <button
      className="favourites"
      id="open-favourites-button"
      onClick={showFavouritesPanel}
      aria-label="Open favourite cities panel"
    >
      <i className="far fa-heart"></i> <span>Favourites</span>
    </button>
  );
};

export default OpenFavouritesButton;
