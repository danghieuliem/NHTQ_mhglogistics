import React, { FC } from "react";

type TProps = {
  placeholder: string;
  onChangeText: (val: string) => void;
};

export const FilterTextarea: FC<TProps> = ({ onChangeText, placeholder }) => {
  return (
    <div className="relative">
      <textarea
        className="h-20 border outline-none border-[#b4b2b23a] w-full rounded-3xl p-4 text-xs"
        onChange={(e) => onChangeText(e.target.value)}
      />
      <div className="absolute -top-3 z-10 left-4 text-xs bg-white p-1">{placeholder}</div>
    </div>
  );
};
