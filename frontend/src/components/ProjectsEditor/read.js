import { useState, useEffect } from 'react';
import FolderTree from 'react-folder-tree';
import _ from "lodash"
import EditModal from "./EditModal"; 
import cookie from "react-cookies";
import 'react-folder-tree/dist/style.css';
import "../Editor/File.css";
import axios from '../../utils/axiosForBackend';
import getFolderTree from '../../utils/getFolderTree';

const File = (props) => {
  const [state, setState] = useState({
    treeData: {}
  }) 
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
        .then(async (data) => {
          const treeData = {};
          await Promise.all(Object.values(data.files.children).map(async file => {
            _.set(treeData, data.files.name + "['" + file.name + "']", {
              content: await file.content,
            })
          }))
          console.log(treeData)
          setState({treeData: treeData})
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [])


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

  body = {
    uid, id, folderTree: getFolderTree(state.treeData, {
      name: ""
    }).children[0], shareable
  };
  // console.log(body.folderTree)
 

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
      <EditModal body={body} />
    </>
  );
};

export default File;