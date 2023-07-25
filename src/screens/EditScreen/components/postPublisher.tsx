import { useState } from "react";
import axios from "axios";
import { Link, redirect, useNavigate } from "react-router-dom";
import { API } from "../../../controllers/API";

type Props = {
  content: string | null;
};

const currentDate = new Date();
export const PublishButton = ({ content }: Props) => {
  const [inFlight, setInFlight] = useState<boolean>(false);
  const [file, setFile] = useState<string>();
  const navigate = useNavigate();
  const handleClick = (event: any) => {
    event.preventDefault();
    setInFlight(true);
    API.post(`/api/v1/post`, {
      content: content,
      createdDate: currentDate.getTime().toString(),
    })
      .then((response) => {
        console.log(response);
        //@ts-expect-error
        setFile(true);
        setInFlight(false);
        navigate(`/publish/${response.data.object.postId}`);
      })
      .catch((err) => {
        setInFlight(false);
        console.log(err);
      });
  };

  return (
    <div>
      {/* <Link to={"/publish"}> */}
      <button
        onClick={handleClick}
        disabled={inFlight}
        className="bg-[#FF86A5] py-2 px-4 mt-10 mx-3 rounded-full text-white"
      >
        Publish
      </button>
      {/* </Link> */}
    </div>
  );
};
