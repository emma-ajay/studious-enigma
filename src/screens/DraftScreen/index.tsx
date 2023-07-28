import { Draft } from "./components/draft";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { API } from "../../controllers/API";
import { IDraft } from "./components/draft";

export const DraftScreen = () => {
  const [drafts, setDrafts] = useState<IDraft[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [inFlight, setInFlight] = useState<boolean>(false);
  const size = 2;

  useEffect(() => {
    setInFlight(true);
    API.get(`api/v1/draft/user?page=0&size=${size}`)
      .then((response) => {
        console.log(response);
        setTotalPages(response.data.totalPages);
        setDrafts(response.data.content);
        setInFlight(false);
      })
      .catch((error) => console.log(error))
      .finally(() => setInFlight(false));
  }, []);

  const getPages = (currentPage: number) => {
    setInFlight(true);
    return API.get(`api/v1/draft/user?page=${currentPage}&size=${size}`)
      .then((response) => {
        console.log(response);
        setCurrentPage(currentPage);
        setDrafts(response.data.content);
        setTotalPages(response.data.totalPages);
        return response.data.content;
      })

      .catch((error) => console.log(error))
      .finally(() => setInFlight(false));
  };

  const handlePageChange = (data: { selected: number }) => {
    console.log("df");
    getPages(data.selected)
      .then(() => {
        // setDrafts(page);
      })
      .catch((err) => console.log(err));
  };
  console.log(drafts);
  return (
    <div>
      {drafts.length > 0 ? (
        <div>
          {drafts.map((draft, index) => (
            <Draft
              number={size * currentPage + index}
              draft={draft}
              key={draft.draftId}
            />
          ))}
          {inFlight && (
            <div className="min-h-screen">
              <div className="">Loading...</div>
            </div>
          )}

          <ReactPaginate
            pageCount={totalPages}
            onPageChange={handlePageChange}
            previousLabel={"< Previous"}
            nextLabel={"Next >"}
            breakLabel={"..."}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            containerClassName={
              "pagination flex items-center justify-center space-x-5 pb-2 mt-5"
            }
            activeClassName={"active"}
            activeLinkClassName={"active text-white bg-[#FF86A5]"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link p-3 rounded"}
            previousClassName={"page-item font-semibold hover:text-[#ff86a5]"}
            nextClassName={"page-item font-semibold hover:text-[#ff86a5]"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
          />
        </div>
      ) : (
        <div>
          <span className="italic font-medium text-2xl text-[#ff86a5]">
            There are no drafts
          </span>
        </div>
      )}
    </div>
  );
};
