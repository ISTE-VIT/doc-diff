import FolderTree, { testData } from 'react-folder-tree';
import _ from "lodash"
import SaveModal from "./SaveModal";
import { useState } from 'react';
import NameModal from "./NameModal";
import cookie from "react-cookies";
import 'react-folder-tree/dist/style.css';
import "./File.css";


const getFolderTree = (treeData, resultObject) => {

  resultObject.children = Object.keys(treeData).map(key => {
    if ("content" in treeData[key]) {
      // means its a file
      return {
        name: key,
        content: treeData[key].content
      }
    }
    else {
      return getFolderTree(treeData[key], {
        name: key
      })

    }
  })

  // console.log(result)
  return resultObject
}

const File = (props) => {
  const [state, setState] = useState({
    treeData: {}
  })
  const [nameModal,setNameModal] = useState(false)
  const [projectName,setProjectName] = useState("") 
  let body;
  const uid = cookie.load("key");
  const onUploadClick = async (files) => {
    console.log(files)
    setNameModal(true)
    const treeData = {}
    await Promise.all(Object.values(files).map(async file => {
      const directoryRegex = /^(.+)\/([^/]*)$/; // first group gives all directories excluding final file, second group gives file name which is not really needed
      const matches = directoryRegex.exec(file.webkitRelativePath)

      // ignore hidden folders
      if (!matches[1].includes(".")) {
        const folderPath = matches[1].split("/").join(".")
        _.set(treeData, folderPath + "['" + file.name + "']", {
          content: await file.text(),
        })
      }
    }))


    console.log("treedata:", treeData)
    setState(oldState => ({
      ...oldState,
      treeData
    }))
    console.log(testData)
  }

  let folderTree = null
  if (state.treeData) {
    folderTree = getFolderTree(state.treeData, {
      name: ""
      // Object.keys(state.treeData)[0]
    }).children[0] 
    body = {uid, projectName, folderTree};
    console.log(body)
    // console.log("folder Tree:", folderTree)
  }
  
  const errorHandler = () => {
    setNameModal(null);
}
  return (
    <>
    {nameModal && (<NameModal title="Project Name" message="Please give your Project a name" onConfirm={errorHandler} changeName={projectName => {setProjectName(projectName)
     setNameModal(null);}}/>)}
      <input
        directory=""
        webkitdirectory=""
        type="file"
        id="actual-btn"
        hidden
        onChange={e => {
          onUploadClick(e.target.files)
        }}
      />
      <label htmlFor="actual-btn">Upload file/folder</label>
      <div className="fileupload">
        {folderTree && <FolderTree
          onNameClick={({ nodeData, defaultOnClick }) => {
            defaultOnClick()
            nodeData.content ? props.changeContent(nodeData.content) : console.log()
          }}
          data={
            folderTree
          }
          showCheckbox={false}
          indentPixels={15}
          readOnly
        />}
      </div>
      <SaveModal body={body}/>
    </>
  );
};

export default File;