import FolderTree, { testData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';

const BasicTree = () => {
    function insert(children = [], [head, ...tail]) {
        let child = children.find(child => child.name === head);
        if (!child) children.push(child = {name: head, children: [],content: ""});
        if (tail.length > 0) insert(child.children, tail);
        return children;
      }
      
      // Example:
      let paths = [
        '/root/library/Folder 1',
        '/root/library/Folder 2',
        '/root/library/Folder 1/Document.docx',
        '/root/library/Folder 1/Document 2.docx',
        '/root/library/Folder 2/Document 3.docx',
        '/root/library/Document 4.docx'
      ];
      
      let objectArray = paths
        .map(path => path.split('/').slice(1))
        .reduce((children, path) => insert(children, path), []); 
    console.log(objectArray[0]);
  return (
    <FolderTree
      data={ objectArray[0] } 
    />
  );
};


export default BasicTree;


import { useEffect, useState } from "react";
import FolderTree, {FolderIcon,FileIcon,FolderOpenIcon} from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';
import axios from "axios";
import cookie from "react-cookies";
import "./File.css";

const File = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [objectArray, setObjectArray] = useState(null);
  let files;

  useEffect(()=>{
    console.log(objectArray);
  }, [objectArray])

  function insert(children = [], [head, ...tail]) {
    let child = children.find(child => child.name === head);
    if (!child) children.push(child = {name: head, children: []});
    if (tail.length > 0) insert(child.children, tail);
    return children;
  }

  const onTreeStateChange = (state, event) => {console.log(state, event);
  console.log(state)}

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
        paths.push(file.webkitRelativePath)
        resolve(files);
      };
      reader.readAsText(file);
    });
  };
  
  const handleUpload = async () => {
    for (let i of selectedFile) files = await processFile(i);
    
    setObjectArray ( paths
    .map(path => path.split('/'))
    .reduce((children, path) => insert(children, path), []));
 
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
      data={objectArray ? objectArray[0]:{}}  
      showCheckbox={ false }     
      readOnly
      indexPixels={0}  
      onChange={ onTreeStateChange }
    />
    </div>
  ); 
};

export default File;
