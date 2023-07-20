import { useState } from "react";
import axios from "axios";
import { Link, redirect, useNavigate } from "react-router-dom";

type Props = {
  content: string;
};

const currentDate = new Date();
export const PublishButton = ({ content }: Props) => {
  const [inFlight, setInFlight] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleClick = (event: any) => {
    event.preventDefault();
    setInFlight(true);
    axios
      .post(
        "https://cunctus.serveo.net/api/v1/post",
        {
          content: content,
          createdDate: currentDate.getTime().toString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjg5NjgyODEwLCJleHAiOjE2OTAyODc2MTB9.60PdUb82C0r3IrEiG2sYhRbKhN2o_ajrQsjZ23bhAKX_cvA0fLGkV6F5oj7ehcE8O4gC-VUtkGzj_lscFOboCw`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT",
          },
        }
      )
      .then((response) => {
        console.log(response);
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
      <button onClick={handleClick} disabled={inFlight}>
        PUBLISH
      </button>
      {/* </Link> */}
    </div>
  );
};
