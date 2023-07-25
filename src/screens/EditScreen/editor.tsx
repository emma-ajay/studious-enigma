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

// Switch language - 'en' or 'zh-CN'

function MyEditor() {
  const { draftId } = useParams();
  i18nChangeLanguage("en");
  // editor instance
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [showContext, setShowContext] = useState<boolean>(false);
  const [xyPosition, setxyPosition] = useState<any>(false);
  const toolbar = DomEditor.getToolbar(editor as IDomEditor);
  //   console.log("message", toolbar?.getConfig());

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

  toolbarConfig.excludeKeys = ["fontFamily", "lineHeight"];

  //   toolbarConfig.insertKeys = {
  //     index: 1,
  //     {
  //        iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path></svg>',
  //        k
  //     }

  //   }

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

  const handleRightClick = (event: any) => {
    // event.preventDefault();
    setShowContext(false);

    const positionChange = {
      x: event.pageX,
      y: event.pageY,
    };
    console.log(event.pageX);
    setxyPosition(positionChange);
    setShowContext(true);
  };

  const hideContext = () => {
    console.log("fre");
    setShowContext(false);
  };

  return (
    <>
      <div
        style={{ border: "1px solid #ccc", zIndex: 100 }}
        // onContextMenu={handleRightClick}
        onClick={handleRightClick}
        className="relative"
      >
        <DraftButton content={html} />
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <div>
          {" "}
          {showContext && (
            <ul
              className="rightClick absolute top-0 left-0"
              style={{
                top: xyPosition.y,
                left: xyPosition.x,
                // transform: "translateX(-50%)",
                // transform: "translateY(-50%)",
              }}
            >
              <li>Some Item</li>
              <li>
                <ImageUploader
                  appendImage={appendImage}
                  hideButton={hideContext}
                  xyPosition={xyPosition}
                />
              </li>
            </ul>
          )}
          <Editor
            defaultConfig={editorConfig}
            value={html}
            onCreated={setEditor}
            onChange={(editor) => setHtml(editor.getHtml())}
            mode="default"
            style={{ height: "500px", overflowY: "hidden" }}
          />
        </div>
        <ImageUploader appendImage={appendImage} />
      </div>
      <div style={{ marginTop: "15px" }}>{html}</div>
    </>
  );
}

export default MyEditor;
