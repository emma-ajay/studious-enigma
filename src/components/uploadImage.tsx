// import React from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { UploadAPI } from "../controllers/API";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "TIF"];

type Props = {
  appendImage?: (url: string) => void;
  handleUploadChangeProp?: (image: any) => void;
  publish?: boolean;
  hideButton?: () => void;
  xyPosition?: {
    x: number;
    y: number;
  };
};
export const ImageUploader = ({
  appendImage,
  handleUploadChangeProp,
  hideButton,
  publish,
}: Props) => {
  const handleUploadChange = async (image: any) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = UploadAPI.post("/api/v1/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjg5NjgyODEwLCJleHAiOjE2OTAyODc2MTB9.60PdUb82C0r3IrEiG2sYhRbKhN2o_ajrQsjZ23bhAKX_cvA0fLGkV6F5oj7ehcE8O4gC-VUtkGzj_lscFOboCw`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT",
      },
    })
      .then((response) => {
        appendImage ? appendImage(response.data.object.imageUrl) : null;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        hideButton ? hideButton() : console.log("false empty");
      });
  };
  return (
    <div>
      <FileUploader
        multiple={false}
        handleChange={
          handleUploadChangeProp ? handleUploadChangeProp : handleUploadChange
        }
        name="image"
        types={fileTypes}
      >
        {publish ? (
          <div className="w-full h-[250px] bg-[#eeeeee] rounded flex flex-col justify-center mb-4">
            <p className="mx-auto mb-1">Click to Upload Image</p>
            <p className="w-3/4 mx-auto text-sm text-[#828282]">
              Include a high-quality image in your story to make it more
              inviting to readers.
            </p>
          </div>
        ) : (
          // <button className="bg-[#3838F3] hover:bg-[#000088] py-7 px-10 mb-8 flex items-center justify-center text-3xl font-bold text-white rounded-[20px] w-full"></button>
          <button
            className={`bg-[#3838F3] hover:bg-[#000088]  text-white flex items-center justify-center px-3 ${
              hideButton ? null : `py-7 mb-8 text-3xl font-bold rounded-[20px]`
            }`}
          >
            <svg
              className="me-4"
              width="50"
              height="47"
              viewBox="0 0 50 47"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.875 25.125H28.125V12.625H37.5L25 0.125L12.5 12.625H21.875V25.125ZM31.25 18.0938V22.9125L45.5594 28.25L25 35.9156L4.44063 28.25L18.75 22.9125V18.0938L0 25.125V37.625L25 47L50 37.625V25.125L31.25 18.0938Z"
                fill="white"
              />
            </svg>
            Upload Image
          </button>
        )}
      </FileUploader>
    </div>
  );
};
