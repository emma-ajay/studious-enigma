import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { API } from "../../controllers/API";
import { MyPost } from "./components/MyPost";

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
export const MyPosts = () => {
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const size = 5;

  const getAllPosts = async () => {
    try {
      const response = await API.get(
        `/api/v1/publish/user?page=0&size=${size}`
      );
      setPosts(response.data.content);
      setTotalPages(response.data.totalPages);
      console.log(response);
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error);
    }
  };

  const getPage = async (currentPage: number) => {
    try {
      const response = await API.get(
        `/api/v1/publish/user?page=${currentPage}&size=${size}`
      );
      return response.data.content;
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = async (data: { selected: number }) => {
    try {
      const page = await getPage(data.selected);
      setPosts(page);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      {/* <div className='grid grid-cols-3 gap-x-7 gap-y-14'> */}
      {posts ? (
        <>
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-x-7 gap-y-14">
                {posts.map((element) => {
                  return <MyPost key={posts.indexOf(element)} post={element} />;
                })}
              </div>
              <ReactPaginate
                previousLabel={"< Previous"}
                nextLabel={"Next >"}
                breakLabel={"..."}
                pageCount={totalPages}
                onPageChange={handlePageChange}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                containerClassName={
                  "pagination flex items-center justify-center space-x-5 pb-2 mt-5"
                }
                activeClassName={"active"}
                activeLinkClassName={"active text-white bg-[#FF86A5]"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link p-3 rounded"}
                previousClassName={
                  "page-item font-semibold hover:text-[#ff86a5]"
                }
                nextClassName={"page-item font-semibold hover:text-[#ff86a5]"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
              />
            </>
          ) : (
            <div className="text-center mb-5">
              <h2>There are no posts here</h2>
            </div>
          )}
        </>
      ) : (
        <div className="mt-5 pt-5 mb-5 text-center">Loading</div>
      )}
      <ToastContainer />
    </div>
  );
};
