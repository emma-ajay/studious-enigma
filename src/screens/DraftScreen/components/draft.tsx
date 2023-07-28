import { Link } from "react-router-dom";
import { deleteAPI } from "../../../controllers/API";
import { ToastContainer, toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/solid";

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
  //   const [inFlight, setInFlight] = useState<boolean>(false);
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
    <div className="bg-[#fcfcfc] rounded-lg shadow-lg p-4 flex justify-between items-center hover:shadow-xl mt-4">
      <Link
        to={`/edit/${draft.draftId}`}
        className="text-xl font-semibold text-gray-800 hover:text-[#FF86A5] transition duration-300"
      >
        Draft {number + 1} ({modifiedDate.toDateString()})
      </Link>
      <div>
        <button
          onClick={handleClick}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
        >
          <TrashIcon className="w-6 h-6" />
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};
