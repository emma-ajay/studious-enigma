import { Link } from "react-router-dom";
import { deleteAPI } from "../../../controllers/API";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

export interface IDraft {
  draftId: number;
  userId: number;
  content: string;
  lastModifiedDate: string;
  createdBy: string;
}

type Props = {
  number: number;
  draft: IDraft;
};

export const Draft = ({ number, draft }: Props) => {
  const modifiedDate = new Date(parseInt(draft.lastModifiedDate));
  const [inFlight, setInFlight] = useState<boolean>(false);
  console.log(modifiedDate);
  const handleClick = () => {
    console.log(draft.draftId);
    deleteAPI
      .delete(`/api/v1/draft/${draft.draftId}`)
      .then((response) => {
        toast.success("Draft Deleted", {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(response);
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(error);
      });
  };
  return (
    <div className="bg-gray-500 mt-3 flex justify-between">
      <Link to={`/edit/${draft.draftId}`}>
        Draft {number + 1} ({modifiedDate.toDateString()})
      </Link>
      <div>
        <button onClick={handleClick}>Delete</button>
      </div>
      <ToastContainer />
    </div>
  );
};
