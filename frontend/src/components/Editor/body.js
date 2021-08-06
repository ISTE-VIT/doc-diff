import File from "./File";
import "./body.css";
import { DiffEditor } from "@monaco-editor/react";
import { useState,useRef } from "react";

const Body = () => {

  var [name, setName] = useState("Choose a file");
  var [code, setCode] = useState("Paste Code Here");
  const diffEditorRef = useRef(null);

  function handleEditorMount(editor) {
    diffEditorRef.current = editor;
  }

  return (
    <div className="editor">
      <div className="row">
        <div className="col-lg-2 grey">
          <File />
        </div>
        <div className="col-lg-10">
          <DiffEditor
            height="80vh"
            defaultLanguage="javascript"
            original={name}
            modified={code}
            onMount={handleEditorMount}
            theme="vs-dark"
            position="relative"
            />
            </div> 
      </div>
    </div>
  );
};

export default Body;
