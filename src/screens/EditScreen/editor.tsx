import "@wangeditor/editor/dist/css/style.css"; // import css

import { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { ImageUploader } from "../../components/uploadImage";
import { DraftButton } from "./components/saveDraft";
import { PublishButton } from "./components/postPublisher";
import { Link, useParams } from "react-router-dom";
import { API } from "../../controllers/API";
import axios from "axios";

function MyEditor() {
  const { draftId } = useParams();
  // editor instance
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  // TS syntax
  //   // const [editor, setEditor] = useState(null)                  // JS syntax

  // editor content
  const [html, setHtml] = useState(() => (draftId ? null : "<p>hello</p>"));

  // Simulate ajax async set html
  const appendImage = (url: string) => {
    const srcLink = `<img src="${url}" alt="someAlt" data-href="jb" style=""/>`;
    editor?.dangerouslyInsertHtml(srcLink);
  };

  // change `uploadImage` menu config

  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS syntax
  // const toolbarConfig = { }
  // JS syntax

  const editorConfig: Partial<IEditorConfig> = {
    // TS syntax
    // const editorConfig = {                       // JS syntax
    MENU_CONF: {
      uploadImage: {},
    },
    placeholder: "Type here...",
  };
  //@ts-ignore
  editorConfig.MENU_CONF["uploadImage"] = {
    server: "https://vestri.serveo.net/api/v1/image",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjg5NjgyODEwLCJleHAiOjE2OTAyODc2MTB9.60PdUb82C0r3IrEiG2sYhRbKhN2o_ajrQsjZ23bhAKX_cvA0fLGkV6F5oj7ehcE8O4gC-VUtkGzj_lscFOboCw`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT",
    },
    fieldName: "custom-field-name",
    // other config...
  };

  //@ts-ignore
  //   console.log(editorConfig?.MENU_CONF["uploadImage"]);

  // Timely destroy editor, important!
  useEffect(() => {
    if (draftId) {
      API.get(`/api/v1/draft/${draftId}`).then((response) => {
        axios
          .get(response.data.object.content)
          .then((response) => {
            setHtml(response.data);
          })
          .catch((error) => console.log(error));
      });
    }
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <DraftButton content={html} />
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: "500px", overflowY: "hidden" }}
        />
        <ImageUploader appendImage={appendImage} />

        <PublishButton content={html} />
      </div>
      <div style={{ marginTop: "15px" }}>{html}</div>
    </>
  );
}

export default MyEditor;