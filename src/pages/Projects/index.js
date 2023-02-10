import './style.css';
import logo from '../../assests/projects-pana.svg';
import SideBar from "../../components/SideBar";
import {useNavigate} from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import {AddCircle} from "iconsax-react";
import {useContext, useEffect, useState} from "react";
import {getProjects} from "../../services/projectService";
import Loading from "../../components/loading";
import ProjectTileComponent from "../../components/ProjectTileComponent";
import {isMobile} from "react-device-detect";
import AppContext from "../../utils/AppContext";
import ProjectTileMobileComponent from "../../components/ProjectTileMobileComponent";

export default function ProjectsScreen() {
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [projects, setProjects] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProjects().then((response) => {
            setProjects(response);
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        });
    }, []);

    if (loading) {
        return <Loading/>
    }

    const formatProjects = (projects) => {
        const listProjects = [];
        let list = []
        let index = 0
        while (index < projects.length) {
            if (index % 2 === 0 && index !== 0) {
                listProjects.push(list);
                list = []
            }
            list.push(projects[index])
            index++;
        }
        listProjects.push(list);

        return listProjects;
    }

    const projectsMobile = () => {
        return (
            projects.map((value) => {
                    return <ProjectTileMobileComponent key={value} data={value}/>
                }
            )
        )
    }

    const projectsMaps = () => {
        const projectFormatted = formatProjects([...projects])

        if (projectFormatted[0].length === 0) {
            return
        }

        return (
            projectFormatted.map((value, index) => {
                    if (value.length === 1) {
                        return (
                            <div key={value} className={"row"}>
                                <ProjectTileComponent data={value[0]} position={"left"}/>
                            </div>
                        )
                    }
                    return (
                        <div key={value} className={"row"}>
                            <ProjectTileComponent data={value[0]} position={"left"}/>
                            <ProjectTileComponent data={value[1]} position={"right"}/>
                        </div>
                    )
                }
            )
        )
    }

    return (
        <div>
            <div className="projects-screen">
                <div className="projects-header">
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
                </div>
                <div className="projects-container">
                    {isMobile || context.size ? projectsMobile() : projectsMaps()}
                </div>
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    )

}
