import { Link } from "react-router-dom";

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

export const Post = ({ post }: Props) => {
  return (
    <div className="newsreader hover:shadow-lg duration-300 flex flex-col items-start justify-between h-[500px] border-[1px] border-gray-200 p-4 rounded-lg">
      {/* <div className=' w-full flex items-center'> */}
      <img
        src={post.thumbnailUrl}
        alt=""
        className="max-w-full max-h-[75%] m-auto object-cover object-center"
      />
      {/* </div> */}
      <div className="h-1/4">
        <Link
          to={`/posts/${post.postId}`}
          className="inter font-medium mt-3 mb-6 block"
        >
          {post.title}
        </Link>
        <p className="text-sm">{post.description}</p>
      </div>
    </div>
  );
};
