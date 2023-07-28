import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAPI } from "../../../controllers/API";

export type IPost = {
  postCoverId: number;
  postId: number;
  blurb: string;
  thumbnailUrl: string;
  category: string;
  title: string;
  description: string;
  publishedDate: string;
};

type Props = {
  post: IPost;
};

export const MyPost = ({ post }: Props) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const handleArchive = () => {
    // Add your archive post logic here
    deleteAPI.delete(`/api/v1/publish/{id}/post`);
    console.log("Post archived:", post.postId);
  };

  const handleOpenClick = () => {
    navigate(`/posts/${post.postId}`);
  };

  return (
    <div
      className="newsreader relative hover:shadow-lg duration-300 flex flex-col items-start justify-between h-[500px] border-[1px] border-gray-200 p-4 rounded-lg"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <img
        src={post.thumbnailUrl}
        alt=""
        className="max-w-full max-h-[75%] m-auto object-cover object-center"
      />
      <div className="h-1/4 text-left">
        <Link
          to={`/posts/${post.postId}`}
          className="inter font-medium mt-3 mb-6 block"
        >
          {post.title}
        </Link>
        <p className="text-sm">{post.description}</p>
      </div>

      {showOverlay && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <div className="flex">
            <button
              onClick={handleArchive}
              className="bg-white hover:bg-red-400 text-black py-2 px-4 rounded-lg m-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
            <button
              onClick={handleOpenClick}
              className="bg-white hover:bg-gray-200 0 text-black py-2 px-4 rounded-lg m-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
