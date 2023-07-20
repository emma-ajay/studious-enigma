import "@wangeditor/editor/dist/css/style.css"; // import css

import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";

function MyEditor() {
  // editor instance
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS syntax
  // const [editor, setEditor] = useState(null)                  // JS syntax

  // editor content
  const [html, setHtml] = useState("<p>hello</p>");

  // Simulate ajax async set html
  useEffect(() => {
    setTimeout(() => {
      setHtml("<p>hello&nbsp;world</p>");
    }, 1500);
  }, []);

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
    fieldName: "custom-field-name",
    // other config...
  };

  console.log(editor?.getMenuConfig("uploadImage"));
  //@ts-ignore
  //   console.log(editorConfig?.MENU_CONF["uploadImage"]);

  // Timely destroy editor, important!
  useEffect(() => {
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
      <div style={{ marginTop: "15px" }}>{html}</div>
    </>
  );
}

export default MyEditor;
