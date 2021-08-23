import { useEffect, useState } from "react";
import FolderTree,{testData} from 'react-folder-tree';
// import axios from "axios";
// import cookie from "react-cookies";
import SaveModal from "./SaveModal";
import 'react-folder-tree/dist/style.css';
import "./File.css";

const File = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  let objectArray;
  let filesMap = {};
  let paths = [];

  const body = {};

  // Used to create the nested objectArray of file objects
  const insert = (children = [], [head, ...tail], fullPath) => {
    let child = children.find(child => { return child.name === head });

    if (!child) children.push(child = { name: head, children: [], content: filesMap[fullPath.join("/")] });
    if (tail.length > 0) insert(child.children, tail, fullPath);

    return children;
  }

  // Used to read the file content and create the paths array and filesMap dictionary
  const handleFileReader = (file) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        const fileContent = e.target.result;
        const path = file.webkitRelativePath;

        // Includes only files which are not related to GitHub
        if (!path.includes(".git")) {
          paths.push(path);
          filesMap[path] = fileContent;
        }

        resolve(path, fileContent)
      };

      reader.readAsText(file);
    })
  }

  // Used upon file upload to create and send the body to the server
  const handleFileUpload = () => {
    // Iterates through selectedFiles and reads the contents of each file
    Object.values(selectedFiles).map(file => handleFileReader(file))

    // Calls the insert function to create the objectArray
    objectArray = paths
    .map(path => path.split('/'))
    .reduce((children, path) => insert(children, path, path), []);

    console.log(objectArray);
  }

  // Runs on file upload, used to await setSelectedFiles
  useEffect(() => {
    console.log(testData)
    handleFileUpload();
  }, [selectedFiles])

  return (
    <>
      <input
        directory=""
        webkitdirectory=""
        type="file"
        id="actual-btn"
        hidden
        onChange={e => setSelectedFiles(e.target.files)}
      />
      <label htmlFor="actual-btn">Upload file/folder</label>
      <SaveModal body={ body } />
      <div className="fileupload">
        <FolderTree
          onNameClick={({ nodeData, defaultOnClick }) => {
            defaultOnClick()
            props.changeContent(nodeData.content)
          }}
          data={testData }
          showCheckbox={false}
          indentPixels={15}
          readOnly
        />
      </div>
    </>
  );
};

export default File;