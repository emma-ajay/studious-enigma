// import React from "react";
import axios from "axios";
import { API } from "../../../controllers/API";
import { useNavigate } from "react-router";
import { string } from "prop-types";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

type Props = {
  content: string;
};

export const DraftButton = ({ content }: Props) => {
  const [inFlight, setInFlight] = useState<boolean>(false);
  const currentDate = new Date();
  const timestamp = currentDate.getTime();

  const navigate = useNavigate();
  const handleClick = () => {
    setInFlight(true);
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
        toast.error(error.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .finally(() => {
        setInFlight(false);
      });
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-[#FF86A5] py-2 px-4 mt-10 rounded-full text-white"
        disabled={inFlight}
      >
        Save Draft
      </button>
      <ToastContainer />
    </div>
  );
};
