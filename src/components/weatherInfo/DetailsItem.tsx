import React from "react";

interface Props {
  header: string;
  value: number | undefined;
  unit?: string;
}

const DetailsItem: React.FC<Props> = ({ header, value, unit }) => {
  return (
    <li className="details-item" tabIndex={0}>
      <h4>{header}</h4>
      <span>
        {value}
        {unit}
      </span>
    </li>
  );
};

export default DetailsItem;
