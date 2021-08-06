import { useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import "./File.css";

const File = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  let files = [];

  const processFile = (file) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        const fileContent = e.target.result;
        files.push({
          name: file.name,
          path: file.webkitRelativePath,
          content: fileContent,
        });
        resolve(files);
      };
      reader.readAsText(file);
    });
  };

  const handleUpload = async () => {
    for (let i of selectedFile) files = await processFile(i);
    const uid = cookie.load("uid");

    const body = { uid, files };

    axios.post("http://localhost:5000/editor/uploadfiles", body).then((res) => {
      console.log(res.statusText);
    });
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
      <label for="actual-btn">Upload File</label>
      <button className="upload_btn" onClick={handleUpload}>Upload!</button>
    </div>
  );
};

export default File;
