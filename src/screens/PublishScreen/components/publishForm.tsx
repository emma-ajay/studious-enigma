import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { any, string } from "prop-types";
import { ImageUploader } from "../../../components/uploadImage";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import { useParams } from "react-router";
import { UploadAPI } from "../../../controllers/API";

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
    const response = UploadAPI.post(
      `/api/v1/publish/${postId}/post`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjg5NjgyODEwLCJleHAiOjE2OTAyODc2MTB9.60PdUb82C0r3IrEiG2sYhRbKhN2o_ajrQsjZ23bhAKX_cvA0fLGkV6F5oj7ehcE8O4gC-VUtkGzj_lscFOboCw`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT",
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error))
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
          <ImageUploader
            handleUploadChangeProp={handleImageUpload}
            publish={true}
          />
          {values.thumbnail ? (
            <div className="flex flex-row items-center w-full h-full justify-center space-x-10">
              <div className="w-1/2">
                <img src={file} alt="" className="w-3/4" />
              </div>
            </div>
          ) : (
            <div></div>
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
            value={"Publish now"}
            className="
        bg-[#FF86A5] max-w-[25%] py-2 px-4 mt-10 rounded-full text-white"
            disabled={inFlight || !submitReady()}
          />
        </div>
      </form>
    </div>
  );
};
