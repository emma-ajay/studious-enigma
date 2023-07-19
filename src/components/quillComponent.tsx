import { React, useState } from "react";
import ReactQuill from "react-quill";
import { Base } from "../App";
import EditorToolbar, { modules, formats } from "../editorToolbar";
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
    const srcLink = `<div style="display: flex; justify-content: center; background-color: red;">
  <img src="${url}" style="align-self: center; width="1700px">
</div>
`;
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
        formats={formats}
      />
      <ImageUploader appendImage={appendImage} />
      {/* {base.isImage ? <ImageUploader appendImage={appendImage} /> : null} */}
    </div>
  );
};
