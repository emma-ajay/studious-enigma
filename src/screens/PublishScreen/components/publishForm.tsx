import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { any, string } from "prop-types";
import { ImageUploader } from "../../../components/uploadImage";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import { useParams } from "react-router";

interface IPublishFormValues {
  thumbnail: any;
  blurb: string;
  title: string;
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
    publishedDate: "",
    category: "",
  });
  const currentDate = new Date();

  const submitReady = () => {
    if (
      values.thumbnail !== "" &&
      values.blurb !== "" &&
      values.title !== "" &&
      values.publishedDate !== "" &&
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
  formData.set("publishedDate", values.publishedDate);
  formData.set("category", values.category);
  //   console.log(values);
  const options = ["life", "sex", "career", "family"];
  const handleSubmit = (event: any) => {
    console.log(values.title);
    event.preventDefault();
    setInFlight(true);
    formData.set("publishedDate", currentDate.getTime().toString());
    const response = axios
      .post(
        `https://cunctus.serveo.net/api/v1/publish/${postId}/post`,
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
    <div>
      <p>Story Preview</p>
      <ImageUploader handleUploadChangeProp={handleImageUpload} />
      {values.thumbnail ? (
        <div className="flex flex-row items-center w-full h-full justify-center space-x-10">
          <div className="w-1/2">
            <img src={file} alt="" className="w-3/4" />
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="title"
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
        <Dropdown
          options={options}
          value={values.category}
          onChange={(option) => {
            setValues((values) => ({
              ...values,
              category: option.value,
            }));
          }}
        />
        <input type="submit" disabled={inFlight || !submitReady()} />
      </form>
    </div>
  );
};
