import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="h-1/4">
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
          <button
            onClick={handleArchive}
            className="bg-white text-black py-2 px-4 rounded-lg"
          >
            Archive Post
          </button>
          <button
            onClick={handleOpenClick}
            className="bg-white text-black py-2 px-4 rounded-lg"
          >
            Open
          </button>
        </div>
      )}
    </div>
  );
};
