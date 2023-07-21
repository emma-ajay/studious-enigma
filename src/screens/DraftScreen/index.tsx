import { Draft } from "./components/draft";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { API } from "../../controllers/API";
import { IDraft } from "./components/draft";

export const DraftScreen = () => {
  const [drafts, setDrafts] = useState<IDraft[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const size = 2;

  useEffect(() => {
    API.get(`api/v1/draft/user?page=1&size=${size}`)
      .then((response) => {
        console.log(response);
        setTotalPages(response.data.totalPages);
        setDrafts(response.data.content);
      })
      .catch((error) => console.log(error));
  }, []);

  const getPages = (currentPage: number) =>
    API.get(`api/v1/draft/user?page=${currentPage}&size=${size}`)
      .then((response) => {
        setDrafts(response.data.content);
        setTotalPages(response.data.totalPages);
        return response.data.content;
      })
      .catch((error) => console.log(error));

  const handlePageChange = (data: { selected: number }) => {
    console.log("df");
    getPages(2)
      .then((page) => {
        // setDrafts(page);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {drafts.map((draft, index) => (
        <Draft number={index + 1} draft={draft} />
      ))}
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        containerClassName={"pagination justify-content-end pb-5 mt-5"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
      />
    </div>
  );
};
