import './style.css';
import SideBar from "../../components/SideBar";
import {useNavigate} from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import {AddCircle} from "iconsax-react";
import {useEffect, useState} from "react";
import {getProjects} from "../../services/projectService";
import Loading from "../../components/loading";
import PreferenceTag from "../../components/PreferenceTag";
import TechnologyTag from "../../components/TechnologyTag";

export default function ProjectsScreen() {
    const navigate = useNavigate();
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

    const projectsView = () => {
        const projectCard = (data) => {
            const link_to = "/user/" + data.creator.uid
            const project_link = "/projects/" + data.pid
            return (
                <div key={data.pid} className="project-card-container">
                    <div className="project-card">
                        <div onClick={() => {
                            navigate(project_link)
                        }}>
                            {data.name}
                        </div>
                        <div className="project-info">
                            <div className="titles">
                                Creator:
                                <div className="creator" onClick={() => {
                                    navigate(link_to)
                                }}>
                                    {data.creator.name} {data.creator.lastname}
                                </div>
                            </div>
                            <div className="project-tech-info">
                                <div className="titles">
                                    Technologies:
                                </div>
                                {data.technologies.map((info) => {
                                    return <TechnologyTag key={info} technology={info}/>
                                })}
                            </div>
                            <div className="project-tech-info">
                                <div className="titles">
                                    Languages:
                                </div>
                                {data.idioms.map((info) => {
                                    return <PreferenceTag key={info} preference={info}/>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

            return (
                <div className="projects-card-container">
                    {projects.map((data) => {
                        return projectCard(data)
                    })}
                </div>
            )
        }

        const mostPopular = () => {
            return (
                <div className="most-popular-card-container">
                    <div className="popular-card">
                        Most Popular
                        <>
                        </>
                    </div>
                </div>
            )
        }

        if(loading) {
            return <Loading/>
        }

        return (
            <div>
                <div className="projects-screen">
                    <div className="projects-header">
                        Projects
                        <AddCircle size="24" color="#B1B1B1" className="create-project-button" onClick={() => {
                            navigate(("/projects/new"))
                        }}/>
                    </div>
                    <div className="projects-container">
                        {mostPopular()}
                        {projectsView()}
                    </div>
                </div>
                <SearchBar/>
                <SideBar/>
            </div>
        )

        }
