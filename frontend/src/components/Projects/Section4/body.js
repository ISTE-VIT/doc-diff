import { useState, useEffect } from "react";
import axios from "../../../utils/axiosForBackend"
import cookie from "react-cookies"; 
import proj from "../../../images/project.svg";
import delicon from "../../../images/delete.png";
import editicon from "../../../images/edit.png";
import linkicon from "../../../images/link.png";
import renameicon from "../../../images/rename.svg";
import ConfirmationModal from "../../UI/ConfirmationModal";
import RenameModal from "./RenameModal";
import ShareModal from "./ShareModal";
import DeleteHandler from "./DeleteHandler.js";
import RenameHandler from "./RenameHandler.js";
import ShareHandler from "./ShareHandler";
import "./section4.css";
import { useHistory } from "react-router";

const Body = () => {
  const uid = cookie.load("key");
  const [projects, setProjects] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [error, setError] = useState(null);
  const [rename, setRename] = useState(null);
  const [share, setShare] = useState(null);
  const [shareStatus, setShareStatus] = useState(null);
  const history = useHistory()

  useEffect(() => {
    axios.get(`/projects/all?uid=${uid}`)
      .then((response) => {
        return response.data
      })
      .then((data) => {
        console.log(data);
        setProjects(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [uid]);

  const handleClick = (id) => {
    cookie.save("id", id, { path: "/" });
    history.push(`/projects/${id}`);
  };

  const errorHandler = () => {
    setError(null);
    setRename(null);
    setShare(null);
  };

  return (
    <>
      {error && (
        <ConfirmationModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
          onDelete={() => {
            DeleteHandler(projectId);
            setError(null);
          }}
        />
      )}
      {rename && (
        <RenameModal
          title={rename.title}
          message={rename.message}
          onConfirm={errorHandler}
          onRename={(name) => {
            RenameHandler({ projectId, name });
            setError(null);
          }}
        />
      )}
      {share && (
        <ShareModal
          title={share.title}
          message={share.message}
          onConfirm={errorHandler}
          shareable={shareStatus}
          id={projectId}
          onShare={(shareable) => {
            ShareHandler({ projectId, shareable });
            setError(null);
          }}
        />
      )}
      <div className="projects">
        <h1 className="blue sec2head extra-bold">Projects</h1>
        <div className="row cards">
          {projects &&
            projects.map((project) => {
              let id = project._id;
              return (
                <div className="col-lg-4">
                  <div className="card">
                    <div className="image-container">
                    <img src={proj} className="card-img" alt="doc-diff" />
                      <div className="after">
                        <button
                          className="projectBtn"
                          onClick={() => {
                            setProjectId(id);
                            console.log(projectId);
                            setError({
                              title:
                                "Are you sure you want to delete this Project ?",
                              message: "You wont be able to recover this.",
                            });
                          }}
                        >
                          <img
                            src={delicon}
                            className="overlayIcons"
                            alt="doc-diff"
                          />
                        </button>
                        <button
                          className="projectBtn"
                          onClick={() => {
                            history.push(`/projects/${id}`);
                          }}
                        >
                          <img
                            src={editicon}
                            className="overlayIcons"
                            alt="doc-diff"
                          />
                        </button>
                        <button
                          className="projectBtn"
                          onClick={() => {
                            setProjectId(id);
                            setShareStatus(project.shareable);
                            console.log(shareStatus);
                            setShare({
                              title:
                                "Do you want to change your project shareable status?",
                              message: "Set your shareable status here",
                            });
                          }}
                        >
                          <img
                            src={linkicon}
                            className="overlayIcons"
                            alt="doc-diff"
                          />
                        </button>
                        <button
                          className="projectBtn"
                          onClick={() => {
                            setProjectId(id);
                            setRename({
                              title: "Do you want to rename this Project?",
                              message: "Give your project a new name",
                            });
                          }}
                        >
                          <img
                            src={renameicon}
                            className="overlayIcons"
                            alt="doc-diff"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5
                        className="card-title"
                        onClick={() => {
                          handleClick(id);
                        }}
                      >
                        {project.name}
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Body;
