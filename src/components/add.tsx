import React from "react";

type Props = {
  handleTextClick: () => void;
  handleImageAddClick: () => void;
};
export const Add = ({ handleTextClick, handleImageAddClick }: Props) => {
  return (
    <div>
      <button onClick={handleTextClick}>Add Text</button>
      <button onClick={handleImageAddClick}>Add Image</button>
    </div>
  );
};
