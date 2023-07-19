import { useState } from "react";
import { QuillComponent } from "./components/quillComponent";
import EditorToolbar, { modules, formats } from "./editorToolbar";
import { ImageUploader } from "./components/uploadImage";
import { FileUploader } from "react-drag-drop-files";
import "react-quill/dist/quill.snow.css";
import "./App.css";
import axiosvt from "axios";
// import DanteEditor from "Dante2";
import { Dante } from "dante3";

export type Base = {
  id: number;
  raw: string;
  isImage: boolean;
  isActive: boolean;
  link?: string;
  caption?: string;
};

export default function App() {
  //   const [baseArray, setBaseArray] = useState<Base[]>([
  //     { id: Date.now(), raw: "", isImage: false, isActive: true },
  //   ]);

  const handleTextClick = () => {
    console.log("text");
    // setBaseArray((baseArray) => [
    //   ...baseArray,
    //   {
    //     id: Date.now(),
    //     raw: "",
    //     isImage: false,
    //     isActive: false,
    //   },
    // ]);
  };

  const handleImageAddClick = () => {
    console.log("Image add clicked");
  };

  //   console.log(baseArray);
  return (
    <div>
      {/* <QuillComponent /> */}
      <Dante />
    </div>
  );
}
