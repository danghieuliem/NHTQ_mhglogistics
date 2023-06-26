import React from "react";

interface TProps {
  color: string;
  statusName: string;
}

const TagStatus = ({ color, statusName }: TProps) => {
  return (
    <div className="w-fit flex justify-center items-center">
      <span
        style={{
          background: color,
          width: "8px",
          height: "8px",
          borderRadius: "100%",
          marginRight: "6px",
        }}
      ></span>
      <span
        style={{
          color,
          fontSize: "12px",
          fontWeight: "bold"
        }}
      >
        {statusName}
      </span>
    </div>
  );
};

export default React.memo(TagStatus);
