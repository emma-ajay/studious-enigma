import { useState } from "react";
import axios from "axios";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { API } from "../../../controllers/API";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  content: string | null;
};

const currentDate = new Date();
export const PublishButton = ({ content }: Props) => {
  const { draftId } = useParams();
  const [inFlight, setInFlight] = useState<boolean>(false);
  const [file, setFile] = useState<string>();
  const navigate = useNavigate();
  const notify = () => {
    toast("Default Notification !");

    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER,
    });

    toast.error("Error Notification !", {
      position: toast.POSITION.TOP_LEFT,
    });

    toast.warn("Warning Notification !", {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    toast.info("Info Notification !", {
      position: toast.POSITION.BOTTOM_CENTER,
    });

    toast("Custom Style Notification with css class!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
    });
  };

  const handleClick = (event: any) => {
    draftId ? console.log("on you") : console.log("never");
    event.preventDefault();
    setInFlight(true);
    draftId
      ? API.post(`/api/v1/post?draftId=${draftId}`, {
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
          })
      : API.post(`/api/v1/post`, {
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
            toast.error(err.response.data.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
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
        {inFlight ? "Loading..." : "Publish"}
      </button>
      <ToastContainer />
      {/* </Link> */}
    </div>
  );
};
