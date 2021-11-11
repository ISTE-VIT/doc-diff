import Navbar from "../components/UI/Navbar"
import Body from '../components/Editor/body';  

const Editor = () => {
return (
    <> 
    <Navbar button={true} projects={true}/> 
    <Body />
    </>
);
};

export default Editor