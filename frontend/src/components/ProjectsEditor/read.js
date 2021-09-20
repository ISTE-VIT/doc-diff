import { useState, useEffect } from 'react';
import FolderTree from 'react-folder-tree';
import _ from "lodash"
import SaveModal from "../Editor/SaveModal";
import NameModal from "../Editor/NameModal";
import cookie from "react-cookies";
import 'react-folder-tree/dist/style.css';
import "../Editor/File.css";
import axios from '../../utils/axiosForBackend';
import getFolderTree
  from '../../utils/getFolderTree';
const File = (props) => {
  const [state, setState] = useState({
    treeData: {}
  })
  const [nameModal, setNameModal] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [shareable, setShareable] = useState(false)
  const uid = cookie.load("key");
  let body;

  // useEffect(() => {
  //   setFolderData(null)
  // }, [nameModal])

  const id = props.id;



  useEffect(() => {

    if (id) {
      axios.get(`/projects/${id}`, {
        headers: {
          authorization: cookie.load("key") || "",
        },
      })
        .then((response) => {
          const data = response.data;
          return data;
        })
        .then((data) => {
          console.log(data.files);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id])


  const onUploadClick = async (files) => {
    console.log(files)
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
    const key = Object.keys(treeData)[0]
    console.log("getFolderTree ",
      getFolderTree(treeData[key], {
        name: key
      }))
    setState(oldState => ({
      ...oldState,
      treeData
    }))
  }

  // if (state.treeData) {
  // console.log(state.treeData) // this prints empty object, something is messed up here
  // folderTree = getFolderTree(state.treeData, {
  //   name: ""
  //   // Object.keys(state.treeData)[0]
  // }).children[0]
  body = {
    uid, projectName, folderTree: getFolderTree(state.treeData, {
      name: ""
    }).children[0], shareable
  };
  console.log(body)
  // console.log("folder Tree:", folderTree)
  // }

  const errorHandler = () => {
    setNameModal(null);
  }

  // if (folderData) {
  //   folderTree = folderData
  // }

  return (
    <>
      {nameModal && (<NameModal title="Project Name" message="Please give your Project a name" onConfirm={errorHandler} changeName={projectName => {
        setProjectName(projectName)
      }}
        changeShare={shareable => {
          console.log(shareable)
          setShareable(shareable)
          setNameModal(null);
        }}
      />)}
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
        <label className="uploadBtn" htmlFor="actual-btn">Upload file/folder</label>
        {body.folderTree && <FolderTree
          onNameClick={({ nodeData, defaultOnClick }) => {
            defaultOnClick()
            nodeData.content ? props.changeContent(nodeData.content) : console.log()
          }}
          data={body.folderTree}
          showCheckbox={false}
          indentPixels={15}
          readOnly
        />}
      </div>
      <SaveModal body={body} />
    </>
  );
};

export default File;