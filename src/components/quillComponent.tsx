import { React, useState } from "react";
import ReactQuill from "react-quill";
import { Base } from "../App";
import EditorToolbar, { modules, formatter } from "../editorToolbar";
import { ImageUploader } from "./uploadImage";

// type Props = {
// //   base: Base;
// };

export const QuillComponent = () => {
  const [content, setContent] = useState<string>("");
  const handleChange = (value: string) => {
    setContent(value);
    console.log(value);
  };
  const appendImage = (url: string) => {
    const srcLink = `<img src="${url}" style="margin: auto" width: 500px>`;
    setContent((content) => content + srcLink);
    console.log(srcLink);
  };

  return (
    <div>
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formatter}
      />
      <ImageUploader appendImage={appendImage} />
      {/* {base.isImage ? <ImageUploader appendImage={appendImage} /> : null} */}
    </div>
  );
};
