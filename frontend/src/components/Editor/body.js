import File from "./File"; 
import "./body.css";
import { DiffEditor } from "@monaco-editor/react";
import { useState,useRef } from "react";
import Split from 'react-split'

const Body = (props) => {

  // var [name, setName] = useState("Choose a file");
  var [code, setCode] = useState("Paste Code Here");
  const [content, setContent] = useState("Choose a file");
  const diffEditorRef = useRef(null);

  function handleEditorMount(editor) {
    diffEditorRef.current = editor;
  }

  return (
    <div className="editor-page">
      <div className="row"> 
      <Split className="split" minSize={200} gutterSize={10} sizes={[190,800]}>
        <div className="grey" >
          <File changeContent={content => setContent(content)}  />
        </div>
        <div className="">
          <DiffEditor
            defaultLanguage="javascript"
            original={content}
            modified={code}
            onMount={handleEditorMount}
            theme="vs-dark" 
            />
            </div> 
      </Split>
      </div>
      
    </div>
  );
};

export default Body;
