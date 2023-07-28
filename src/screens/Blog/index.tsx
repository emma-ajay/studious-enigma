import { useState, useEffect } from "react";
import parse from "html-react-parser";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./post.css";
import { API } from "../../controllers/API";

type PostProps = {
  creator: string;
  date: number;
};

export const FileContentComponent = () => {
  console.log("running");

  const { postId } = useParams();
  const [fileContent, setFileContent] = useState<string>("");
  const [creator, setCreator] = useState<string>("");
  const [date, setDate] = useState<number>(0);

  const getPostCover = async () => {
    const response = await API.get(`/api/v1/publish/${postId}/post`);
    console.log(response);
  };

  const getPost = async () => {
    const response = await API.get(`/api/v1/post/${postId}`);
    // console.log(response)
    setCreator(response.data.object.createdBy);
    setDate(parseInt(response.data.object.publishedDate));
    const data = await axios.get(response.data.object.content);
    // console.log(data.data)
    setFileContent(data.data);
  };

  useEffect(() => {
    getPostCover();
    getPost();
    // console.log(new Date(date))
  }, []);

  return (
    <div className="newsreader max-w-[50vw] mx-auto text-xl leading-8">
      {/* <h1 className='font-bold text-2xl'>Ask AJ about post cover</h1> */}
      {/* <h1 className='font-bold text-2xl'>Issue with published date</h1> */}
      <PostedBy creator={creator} date={date} />
      <div className="post">{parse(fileContent)}</div>
    </div>
  );
};

const PostedBy = ({ creator, date }: PostProps) => {
  const publishedDate = new Date(date).toDateString();

  return (
    <div className="flex space-x-4 items-center justify-start my-10">
      <svg
        className="rounded-[50%] border-[1px] border-gray-600 p-[2px]"
        width="48"
        height="48"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id=" person">
          <g id="Glyph">
            <path
              d="M8.1962 0H7.8038C7.70679 0 7.60982 0.00403343 7.51314 0.0120898C5.58682 0.172616 4.15536 1.86434 4.31589 3.79066L4.4801 5.76123C4.63266 7.59189 6.163 9 8 9C9.837 9 11.3673 7.59189 11.5199 5.76123L11.6841 3.79066C11.6922 3.69398 11.6962 3.59701 11.6962 3.5C11.6962 1.567 10.1292 0 8.1962 0Z"
              fill="#545969"
            />
            <path
              d="M11.9001 9.46256C10.8772 10.4176 9.50449 11 8 11C6.49551 11 5.12276 10.4176 4.09985 9.46256L2.34082 10.1222C0.932802 10.6502 0 11.9962 0 13.5V15C0 15.5523 0.447715 16 1 16H15C15.5523 16 16 15.5523 16 15V13.5C16 11.9962 15.0672 10.6502 13.6592 10.1222L11.9001 9.46256Z"
              fill="#545969"
            />
          </g>
        </g>
      </svg>
      <div>
        <h3 className="text-black font-medium text-lg">
          {creator || "John Doe"}
        </h3>
        <p className="text-sm ">{publishedDate}</p>
      </div>
    </div>
  );
};
