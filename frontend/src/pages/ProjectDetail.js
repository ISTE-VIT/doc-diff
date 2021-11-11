import Navbar from "../components/UI/Navbar"
import ProjectsBody from '../components/ProjectsEditor/body';  
import { useParams } from "react-router-dom";


const ProjectDetail = () => {
    const params = useParams();
    console.log(params.projectId)
    return (
        <> 
        <Navbar button={true} projects={true}/> 
        <ProjectsBody id={params.projectId}/>
        </>
    );
}

export default ProjectDetail