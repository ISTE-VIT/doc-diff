import FolderTree, { testData } from 'react-folder-tree';
import _ from "lodash"
import SaveModal from "./SaveModal";
import { useState,useEffect } from 'react';
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
  const [folderData,setFolderData] = useState(null) 
  const uid = cookie.load("key");
  let folderTree = null;
  let body;  

  useEffect(()=>{
    setFolderData(null)
  },[nameModal])


  const id = cookie.load("id");
  const requestOptions = {
    method: "GET",
  };
  if(id){
    fetch(`http://localhost:5000/projects/${id}`, requestOptions)
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        console.log(data.files);
        setFolderData(data.files); 
      })
      .catch((error) => {
        console.log(error);
      });
  } 
    

  const onUploadClick = async (files) => {
    cookie.remove("id")
    console.log(files) 
    setNameModal(true)  
    setFolderData(null)
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

  if (state.treeData) {
    folderTree = getFolderTree(state.treeData, {
      name: ""
      // Object.keys(state.treeData)[0]
    }).children[0]  
    body = {uid, projectName, folderTree };
    console.log(body)
    // console.log("folder Tree:", folderTree)
  }
  
  const errorHandler = () => {
    setNameModal(null);
  }
   
    if(folderData)
    {
      folderTree = folderData 
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
      <div className="fileupload">
      <label htmlFor="actual-btn">Upload file/folder</label>
        {folderTree && <FolderTree
          onNameClick={({ nodeData, defaultOnClick }) => {
            defaultOnClick()
            nodeData.content ? props.changeContent(nodeData.content) : console.log()
          }}
          data={
            folderTree ? folderTree : {}
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