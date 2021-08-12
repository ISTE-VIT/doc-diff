import { useEffect, useState } from "react";
import FolderTree, { FolderIcon, FileIcon, FolderOpenIcon } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';
import axios from "axios";
import cookie from "react-cookies";
import "./File.css";

const File = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [objectArray, setObjectArray] = useState(null);
  let files;
  const [filesMap, setFilesMap] = useState({})

  useEffect(() => {
    console.log(objectArray);
  }, [objectArray])

  function insert(children = [], path, fullPath) {
    const [head, ...tail] = path

    console.log("path :", path)
    let child = children.find(child => {


      return child.name === head
    });

    console.log("fullpath:", fullPath)
    if (!child) children.push(
      child = { name: head, children: [], content: filesMap[fullPath.join("/")] });
    if (tail.length > 0) insert(child.children, tail, fullPath);
    return children;
  }

  const onTreeStateChange = (state, event) => {
    console.log(state, event);
    console.log(state)
  }

  let paths = []

  const processFile = (file) => {
    files = [];
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        const fileContent = e.target.result;
        files.push({
          name: file.name,
          path: file.webkitRelativePath,
          content: fileContent,
        });

        if (
          !file.webkitRelativePath.includes(".git")) {
          console.log("non git file:", file.webkitRelativePath)
          setFilesMap(oldState => ({
            ...oldState,
            [file.webkitRelativePath]: fileContent
          }))

          paths.push(file.webkitRelativePath)
        }
        resolve(files);
      };
      reader.readAsText(file);
    });
  };

  const handleUpload = async () => {
    for (let file of selectedFile) files = await processFile(file);

    setObjectArray(paths
      .map(path => path.split('/'))
      .reduce((children, path) => {
        // console.log("children",children)
        return insert(children, path, path)
      }, []));

    // const uid = cookie.load("uid");

    // const body = { uid, files };

    // axios.post("http://localhost:5000/editor/uploadfiles", body).then((res) => {
    //   console.log(res.statusText);
    // }); 
  };

  return (
    <div className="fileupload">
      <input
        directory=""
        webkitdirectory=""
        type="file"
        id="actual-btn"
        hidden
        onChange={(e) => setSelectedFile(e.target.files)}
      />
      <label htmlFor="actual-btn">Upload File</label>
      <button className="upload_btn" onClick={handleUpload}>Upload!</button>
      <FolderTree
        onNameClick={({ nodeData, defaultOnClick }) => {
          defaultOnClick()
          console.log("clicked :", nodeData.content)
        }}
        data={objectArray ? objectArray[0] : {}}
        showCheckbox={false}
        readOnly
        indexPixels={0}
        onChange={onTreeStateChange}
      />
    </div>
  );
};

export default File;
