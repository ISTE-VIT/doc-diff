import Read from "./read"; 
import "../Editor/body.css";
import { DiffEditor } from "@monaco-editor/react";
import { useState,useRef } from "react";
import Split from 'react-split'

const Body = (props) => {
 
  let code = "Paste Code Here";
  const [content, setContent] = useState("Choose a file");
  const [notShareable, setNotShareable] = useState(false);
  const diffEditorRef = useRef(null);

  function handleEditorMount(editor) {
    diffEditorRef.current = editor;
  }

  const handleNotShareable = () => {
    setNotShareable(true);
  }

  return (
    <div className="editor-page">
      {!notShareable && (
      <div className="row"> 
      <Split className="split" minSize={200} gutterSize={10} sizes={[190,800]}>
        <div className="grey" >
          <Read changeContent={content => setContent(content)} id={props.id} onNotShareable={handleNotShareable}/>
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
      </div>)}
      {notShareable && (
        <h2 className="notShareable">Oops! This is not a shareable Project.</h2>
      )}
    </div>
  );
};

export default Body;