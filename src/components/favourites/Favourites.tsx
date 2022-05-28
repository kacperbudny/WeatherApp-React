import React, { useCallback, useEffect, useRef } from "react";
import { IFavouriteObject } from "../../utils/interfaces/favouriteObject";
import FavouritesHeader from "./FavouritesHeader";
import FavouritesList from "./FavouritesList";
import FocusTrap from "focus-trap-react";

interface Props {
  onClose: () => void;
  favourites: IFavouriteObject[];
  onDelete: (cityName: string) => void;
  changeCity: (cityName: string) => void;
}

const Favourites: React.FC<Props> = ({
  onClose,
  favourites,
  onDelete,
  changeCity,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const closePanel = useCallback(() => {
    setTimeout(() => {
      containerRef.current!.style.right = "calc(-100% - 100px)";
      overlayRef.current!.style.opacity = "0.0";
    }, 0);

    setTimeout(() => {
      onClose();
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }, 500);
  }, [onClose]);

  useEffect(() => {
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = "fixed";

    setTimeout(() => {
      overlayRef.current!.style.opacity = "1.0";
      containerRef.current!.style.right = "0px";
    }, 0);

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.code === "Escape") {
        closePanel();
      }
    };

    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [closePanel]);

  return (
    <>
      <FocusTrap>
        <div>
          <div id="dark-overlay" ref={overlayRef} onClick={closePanel}></div>
          <div id="favourites-container" ref={containerRef}>
            <FavouritesHeader onClose={closePanel} />
            <FavouritesList
              favourites={favourites}
              onDelete={onDelete}
              changeCity={changeCity}
              closePanel={closePanel}
            />
          </div>
        </div>
      </FocusTrap>
    </>
  );
};

export default Favourites;
