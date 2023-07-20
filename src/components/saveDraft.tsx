import React from "react";

type Props = {};

export const DraftButton = ({}: Props) => {
  const handleClick = () => {
    console.log("draft upload clicked");
  };
  return (
    <div>
      <button>Save Draft</button>
    </div>
  );
};
