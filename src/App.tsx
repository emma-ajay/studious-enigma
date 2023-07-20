import { useState } from "react";
import { QuillComponent } from "./components/quillComponent";
import EditorToolbar, { modules, formats } from "./editorToolbar";
import { ImageUploader } from "./components/uploadImage";
import { FileUploader } from "react-drag-drop-files";
import "react-quill/dist/quill.snow.css";
import "./App.css";
import axios from "axios";
import { Add } from "./components/add";
import MyEditor from "./components/wang-editor/editor";
import { PublishScreen } from "./screens/PublishScreen";

export default function App() {
  //   const [baseArray, setBaseArray] = useState<Base[]>([
  //     { id: Date.now(), raw: "", isImage: false, isActive: true },
  //   ]);

  //   console.log(baseArray);
  return (
    <div>
      <MyEditor />
      {/* <PublishScreen /> */}
    </div>
  );
}
