import { useState } from "react";
import { ImageUploader } from "../../../components/uploadImage";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useParams } from "react-router";
import { UploadAPI } from "../../../controllers/API";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

interface IPublishFormValues {
  thumbnail: any;
  blurb: string;
  title: string;
  description: string;
  publishedDate: string;
  category: string;
}
const formData = new FormData();
export const PublishForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState<string>("");
  const [inFlight, setInFlight] = useState<boolean>(false);
  const [values, setValues] = useState<IPublishFormValues>({
    thumbnail: "",
    blurb: "",
    title: "",
    description: "",
    publishedDate: "",
    category: "",
  });
  const currentDate = new Date();

  //@ts-ignore
  const user: string | null = JSON.parse(localStorage.getItem("UserName"));

  const submitReady = () => {
    if (
      values.thumbnail !== "" &&
      values.blurb !== "" &&
      values.title !== "" &&
      values.title !== "" &&
      //   values.publishedDate !== "" &&
      values.category !== ""
    ) {
      return true;
    }

    return false;
  };

  const handleImageUpload = (image: any) => {
    formData.set("thumbnail", image);
    setValues((values) => ({
      ...values,
      thumbnail: image,
    }));
    setFile(URL.createObjectURL(image));
  };

  formData.set("blurb", values.blurb);
  formData.set("title", values.title);
  formData.set("description", values.description);
  formData.set("publishedDate", values.publishedDate);
  formData.set("category", values.category);
  //   console.log(values);
  const options = ["Design", "UX", "Tech", "Lifestyle", "Skincare", "Food"];
  const handleSubmit = (event: any) => {
    console.log(values.title);
    event.preventDefault();
    setInFlight(true);
    formData.set("publishedDate", currentDate.getTime().toString());
    UploadAPI.post(`/api/v1/publish/${postId}/post`, formData)
      .then((response) => {
        toast.success("Post Published!", {
          position: toast.POSITION.TOP_CENTER,
        });
        //don't forget to set a timeout before routing to allposts
        setTimeout(() => navigate(`/allposts`), 1500);

        console.log(response);
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(error);
      })
      .finally(() => setInFlight(false));
  };
  return (
    <div className="max-w-5xl mx-auto">
      <form
        className="grid grid-cols-2 gap-20 place-content-center h-[80vh]"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="font-bold mb-2 text-left text-lg">Story Preview</h1>
          {values.thumbnail ? (
            <div className="relative h-[250px] mb-8">
              <ImageUploader
                handleUploadChangeProp={handleImageUpload}
                publish={true}
                background={"#eeeeee01"}
              />
              <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="h-full">
                  <img src={file} alt="" className="max-h-[100%] m-auto" />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <ImageUploader
                handleUploadChangeProp={handleImageUpload}
                publish={true}
              />
              <div></div>
            </div>
          )}
          <input
            className="block border-b-[1px] border-[#828282] py-1 w-full mb-4 outline-none"
            placeholder="Title"
            value={values.title}
            onChange={(event) => {
              const text = event.target.value;
              setValues((values) => ({
                ...values,
                title: text,
              }));
            }}
          />
          <input
            className="block border-b-[1px] border-[#828282] py-1 w-full mb-4 outline-none"
            placeholder="Description"
            value={values.description}
            onChange={(event) => {
              const text = event.target.value;
              setValues((values) => ({
                ...values,
                description: text,
              }));
            }}
          />
          <input
            className="block border-b-[1px] border-[#828282] py-1 w-full mb-4 outline-none"
            placeholder="Blurb"
            value={values.blurb}
            onChange={(event) => {
              const text = event.target.value;
              setValues((values) => ({
                ...values,
                blurb: text,
              }));
            }}
          />
        </div>
        <div className="flex flex-col">
          <p className="mb-4 text-left font-medium">
            Publishing to: <span className="font-bold">{user}</span>
          </p>
          <p className="text-left mb-3 text-base font-medium text-[#808080]">
            Add or change topics (up to 5) so readers know what your story is
            about
          </p>
          <Dropdown
            className="border-2 text-left"
            placeholder={"Add a topic..."}
            options={options}
            value={values.category}
            onChange={(option) => {
              setValues((values) => ({
                ...values,
                category: option.value,
              }));
            }}
          />
          <p className="text-left mt-4">
            <span className="font-medium ">Note:</span> Changes here will affect
            how your story appears to the public
          </p>
          <input
            type="submit"
            value={inFlight ? "Loading..." : "Publish Now"}
            className="
        bg-[#FF86A5] max-w-[25%] py-2 mt-10 rounded-full text-white"
            disabled={inFlight || !submitReady()}
          />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
