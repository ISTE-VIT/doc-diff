import { useEffect, useState } from "react";
import FolderTree from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';
import axios from "axios"; 
import cookie from "react-cookies";
import "./File.css";

const File = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [objectArray, setObjectArray] = useState(null);   

  useEffect(()=>{  
    setObjectArray(JSON.parse(localStorage.getItem('files')));  
  },[]);

  let [filesMap, setFilesMap] = useState({});
  let files; 

  function insert(children = [], [head, ...tail], fullPath) {
    let child = children.find(child => { return child.name === head });

    if (!child) children.push(
      child = { name: head, children: [], content: filesMap[fullPath.join("/")] }
    );

    if (tail.length > 0) insert(child.children, tail, fullPath);
    return children;
  }

  const processContent = (file,fileContent) => {
    return new Promise ((resolve,reject) => {
      setFilesMap(oldState => ({
        ...oldState,
        [file.webkitRelativePath]: fileContent
      }))
      console.log(filesMap)
      resolve(fileContent);
    }
    )
  }
  
  let paths = []
  
  const processFile = (file) => {
    files = [];
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        const fileContent = e.target.result;
        
        if (!file.webkitRelativePath.includes(".git")) {
          let trash = await processContent(file,fileContent);
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
        return insert(children, path, path)
      }, []));
      
      console.log(objectArray);
      
      const uid = cookie.load("uid");
      const name = "test";
      
      localStorage.setItem('files',JSON.stringify(objectArray)); 
      
      const body = {uid, name, objectArray};
      console.log(body);
      
      axios.post("http://localhost:5000/projects/create", body).then((res) => {
        console.log(res);
      });
    };
    
      // const handleFile = (e) => {
      //   setSelectedFile(e.target.files) 
      //   handleUpload();   
      //   handleUpload();   
      //   handleUpload();   
      // }
      
      return (
        <>
      <input
        directory=""
        webkitdirectory=""
        type="file"
        id="actual-btn"
        hidden
        onChange={(e) => setSelectedFile(e.target.files) }
        />
      <label htmlFor="actual-btn">Upload file/folder</label>
      <button className="upload_btn" onClick={handleUpload}>Upload!</button>
        <button className="save_btn">Save to Projects</button>
      <div className="fileupload">
      <FolderTree
        onNameClick={({ nodeData, defaultOnClick }) => { 
          defaultOnClick()
          props.changeContent(nodeData.content)
        }}
        data={objectArray ? objectArray[0] : {}}
        showCheckbox={false} 
        indentPixels={15} 
        readOnly
        />
      </div>
    </>
  );
};

export default File;
