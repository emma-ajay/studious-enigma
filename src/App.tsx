import { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./editorToolbar";
import { FileUploader } from "react-drag-drop-files";
import "react-quill/dist/quill.snow.css";
import "./App.css";
import axios from "axios";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "TIF", "PDF"];

export default function App() {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<string>();

  const handleChange = (value: string) => {
    setContent(value);
    console.log(value);
  };

  const handleUploadChange = async (image: any) => {
    setFile("");
    const formData = new FormData();
    formData.append("image", image);
    const response = await axios.post(
      "http://165.232.123.217:8079/api/v1/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjg5NjgxMTY3LCJleHAiOjE2OTAyODU5Njd9.MDilxbEqlTBt9e9-oRLNxsX_NdHR9GJP6PwA2n9zjpRDkVgaf3ky4GgbJDXaHzrnTxlqOPVQwSo5yvmIMUEP3A`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT",
        },
      }
    );
    // const response = await axios.get('165.232.123.217:8000/all_users')
    // console.log(response.data)
    setFile(URL.createObjectURL(image));
    console.log(response);
  };
  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
      <FileUploader
        multiple={false}
        handleChange={handleUploadChange}
        name="image"
        types={fileTypes}
      >
        <button className="bg-[#3838F3] hover:bg-[#000088] py-7 px-10 mb-8 flex items-center justify-center text-3xl font-bold text-white rounded-[20px] w-full">
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
      </FileUploader>
    </div>
  );
}
