import './style.css';
import logo from '../../assests/projects-pana.svg';
import SideBar from "../../components/SideBar";
import {useNavigate} from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import {AddCircle} from "iconsax-react";
import {useContext, useEffect, useState} from "react";
import {getProjects} from "../../services/projectService";
import Loading from "../../components/loading";
import {isMobile} from "react-device-detect";
import AppContext from "../../utils/AppContext";
import ProjectTileMobileComponent from "../../components/ProjectTileMobileComponent";

export default function ProjectsScreen() {
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProjects().then((response) => {
            setProjects([...response]);
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        });
    }, []);

    if (loading) {
        return <Loading/>
    }

    const coverMobile = () => {
        return (<div className="projects-header">
            <div className="projects-cover-reduced">
                <div className="projects-cover-title-reduced">
                    Find the project you’ve been looking forward to work in
                </div>
                <img src={logo} className="pana-projects-style-reduced" alt="logo"/>
                <button className="createProjectButtonCover" onClick={() => {
                    navigate(("/projects/new"))
                }}>
                    <AddCircle color="#FAFAFA" variant="Bold" size={24} className="icon"/>
                    Create Project
                </button>
            </div>
        </div>)
    }
    const cover = () => {
        return (<div className="projects-header">
            <div className="projects-cover">
                <div className="projects-cover-title">
                    Find the project you’ve been looking forward to work in
                    <button className="createProjectButtonCover" onClick={() => {
                        navigate(("/projects/new"))
                    }}>
                        <AddCircle color="#FAFAFA" variant="Bold" size={24} className="icon"/>
                        Create Project
                    </button>
                </div>
                <img src={logo} className="pana-projects-style" alt="logo"/>
            </div>
        </div>)
    }

    return (
        <div>
            <div className="projects-screen">
                {isMobile || context.size ? coverMobile() : cover()}
                <div className="projects-container">
                    {projects.map((value) => {
                        return <ProjectTileMobileComponent key={value.pid} data={value}/>
                    })}
                </div>
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    )
}
