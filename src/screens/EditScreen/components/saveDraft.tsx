// import React from "react";
import axios from "axios";
import { API } from "../../../controllers/API";
import { useNavigate } from "react-router";

type Props = {
  content: string;
};

export const DraftButton = ({ content }: Props) => {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();

  const navigate = useNavigate();
  const handleClick = () => {
    API.post(`/api/v1/draft`, {
      content: content,
      lastModifiedDate: timestamp,
    })
      .then((response: any) => {
        console.log(response);
        navigate(`/drafts`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={handleClick} className="bg-red-400">
        Save Draft
      </button>
    </div>
  );
};
