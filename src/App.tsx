import { useState } from 'react';
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./editorToolbar";
import "react-quill/dist/quill.snow.css";
import './App.css'

export default function App() {
  const [content, setContent] = useState('');

  const handleChange = (value: string) => {
    setContent(value);
    console.log(content);
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
  </div>
  )
}


