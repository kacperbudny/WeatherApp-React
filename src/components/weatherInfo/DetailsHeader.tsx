import React from "react";

const DetailsHeader: React.FC = () => {
  const collapseDetails = (event: React.MouseEvent): void => {
    const panel = (event.currentTarget! as HTMLElement)
      .nextElementSibling! as HTMLElement;
    panel.classList.toggle("active");

    if (!panel.style.maxHeight) {
      initDetailsContentsMaxWidth();
    }

    setTimeout(() => {
      if (!panel.classList.contains("active")) {
        panel.style.maxHeight = "0";
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  };

  const initDetailsContentsMaxWidth = (): void => {
    const detailsContent = document.getElementById("details-content")!;
    detailsContent.style.maxHeight = detailsContent.scrollHeight + "px";
  };

  return (
    <button id="details-header" onClick={collapseDetails} aria-label="Details">
      <div className="flex-container">
        <h3>Details</h3>
        <span>▼</span>
      </div>
    </button>
  );
};

export default DetailsHeader;
