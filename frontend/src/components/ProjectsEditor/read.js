import { useState, useEffect } from 'react';

import _ from "lodash"
import EditModal from "./EditModal";
import cookie from "react-cookies";
import 'react-folder-tree/dist/style.css';
import "../Editor/File.css";
import axios from '../../utils/axiosForBackend';
import getFolderTree from '../../utils/getFolderTree';
import getTreeDataFromFiles from '../../utils/getTreeDataFromFiles';
import FileFolderTree from '../common/FileFolderTree';

const File = (props) => {
  const [state, setState] = useState({
    folderTree: {}
  })
  let shareable = false;
  const uid = cookie.load("key");
  let body;

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
          console.log("backend gave me this", data)

          setState((oldState) => {
            return {
              ...oldState,
              folderTree: data.files
            }
          })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id])

  const onUploadClick = async (files) => {
    console.log("getting called at the right time")
    const treeData = await getTreeDataFromFiles(files)

    setState(oldState => ({
      ...oldState,
      folderTree: getFolderTree(treeData)
    }))
  }

  // body = {
  //   uid, id, folderTree: getFolderTree(state.treeData, {
  //     name: ""
  //   }).children[0], shareable
  // };


  // console.log(body.folderTree)

  console.log("folder treeeeeee", state.folderTree)
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

        <FileFolderTree
          folderTree={state.folderTree}
          changeContent={props.changeContent}
        />
      </div>
      <EditModal body={body} />

    </>
  );
};

export default File;