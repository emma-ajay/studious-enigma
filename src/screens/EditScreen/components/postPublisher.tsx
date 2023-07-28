import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
            console.log(file);
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
