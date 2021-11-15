import { useState } from 'react';
import { testData } from 'react-folder-tree';
import SaveModal from "./SaveModal";
import NameModal from "./NameModal";
import cookie from "react-cookies";
import 'react-folder-tree/dist/style.css';
import "./File.css";

import getFolderTree from '../../utils/getFolderTree';
import getTreeDataFromFiles from '../../utils/getTreeDataFromFiles';
import FileFolderTree from '../common/FileFolderTree';

const File = (props) => {
  const [state, setState] = useState({
    treeData: {}
  })
  const [showNameModal, setShowNameModal] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [isShareable, setIsShareable] = useState(false)
  const uid = cookie.load("key");
  let folderTree = null;
  let body;

  const onUploadClick = async (files) => {
    cookie.remove("id")
    // console.log(files)
    setShowNameModal(true)
    const treeData = await getTreeDataFromFiles(files)
    console.log("treedata:", treeData)
    setState(oldState => ({
      ...oldState,
      treeData
    }))
    console.log(testData)
  }

  if (state.treeData) {
    folderTree = getFolderTree(state.treeData).children[0]
    body = { uid, projectName, folderTree, shareable: isShareable };
    console.log(body)
  }

  const errorHandler = () => {
    setShowNameModal(null);
  }
  console.log(folderTree)

  return (
    <>
      {showNameModal && (<NameModal title="Project Name" message="Please give your Project a name" onConfirm={errorHandler} changeName={projectName => {
        setProjectName(projectName)
      }}
        changeShare={shareable => {
          console.log(shareable)
          setIsShareable(shareable)
          setShowNameModal(null);
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
      <div style={{
        height: "100%",
        position: "relative",
      }} >
        <label className="uploadBtn" htmlFor="actual-btn">Upload file/folder</label>
        {folderTree &&
          <FileFolderTree folderTree={folderTree} changeContent={props.changeContent} />
          // <FolderTree
          // onNameClick={({ nodeData, defaultOnClick }) => {
          //   defaultOnClick()
          //   nodeData.content ? props.changeContent(nodeData.content) : console.log()
          // }}
          // data={body.folderTree ? body.folderTree : {}}
          // showCheckbox={false}
          // indentPixels={15}
          // readOnly
          // />
        }
        <SaveModal body={body} />
      </div>
    </>
  );
};

export default File;