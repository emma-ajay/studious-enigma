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
import { DomEditor } from "@wangeditor/editor";
import { i18nChangeLanguage } from "@wangeditor/editor";
import { UploadAPI } from "../../controllers/API";

// Switch language - 'en' or 'zh-CN'

type InsertFnType = (url: string, alt: string, href: string) => void;

function MyEditor() {
  const { draftId } = useParams();
  i18nChangeLanguage("en");
  // editor instance
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  const toolbar = DomEditor.getToolbar(editor as IDomEditor);
  console.log("message", toolbar?.getConfig().toolbarKeys);

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

  toolbarConfig.excludeKeys = [
    "fontFamily",
    "lineHeight",
    "insertTable",
    "group-video",
    "insertTable",
  ];

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
    async customUpload(file: File, insertFn: InsertFnType) {
      // TS syntax

      // `file` is your selected file
      const formData = new FormData();
      formData.append("image", file);
      // upload images yourself, and get image's url, alt, href
      const response = await UploadAPI.post("/api/v1/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjg5NjgyODEwLCJleHAiOjE2OTAyODc2MTB9.60PdUb82C0r3IrEiG2sYhRbKhN2o_ajrQsjZ23bhAKX_cvA0fLGkV6F5oj7ehcE8O4gC-VUtkGzj_lscFOboCw`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT",
        },
      });
      // insert image
      insertFn(
        response.data.object.imageUrl,
        "an image",
        response.data.object.imageUrl
      );
    },
    // other config...
  };

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
      </div>
      <div className="flex justify-end">
        <PublishButton content={html} />
        <DraftButton content={html} />
      </div>
      {/* <div style={{ marginTop: "15px" }}>{html}</div> */}
    </>
  );
}

export default MyEditor;
