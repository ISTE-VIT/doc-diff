import FolderTree, { testData } from 'react-folder-tree';
// import axios from "axios";
import _ from "lodash"
// import cookie from "react-cookies";
import SaveModal from "./SaveModal";
import 'react-folder-tree/dist/style.css';
import "./File.css";
import { useState } from 'react';

// const createFolderAndAddFile = (folderPath, fileName, treeObject) => {

// }

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
  const onUploadClick = (files) => {
    console.log(files)
    const treeData = {}
    Object.values(files).forEach(async file => {
      const directoryRegex = /^(.+)\/([^/]*)$/; // first group gives all directories excluding final file, second group gives file name which is not really needed
      const matches = directoryRegex.exec(file.webkitRelativePath)

      // ignore hidden folders
      if (!matches[1].includes(".")) {
        const folderPath = matches[1].split("/").join(".")
        _.set(treeData, folderPath + "['" + file.name + "']", {
          content: await file.text(),
        })
      }
    })


    console.log("treedata:", treeData)
    setState(oldState => ({
      ...oldState,
      treeData
    }))
    console.log(testData)
  }

  if (state.treeData) {
    const folderTree = getFolderTree(state.treeData, {
      name: {}
      // Object.keys(state.treeData)[0]
    })
    console.log("folder Tree:", folderTree.children[0])
  }
  return (
    <>
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
        <FolderTree
          // onNameClick={({ nodeData, defaultOnClick }) => {
          //   defaultOnClick()
          //   props.changeContent(nodeData.content)
          // }}
          data={
            testData
          }
          showCheckbox={false}
          indentPixels={15}
          readOnly
        />
      </div>
      <SaveModal />
    </>
  );
};

export default File;