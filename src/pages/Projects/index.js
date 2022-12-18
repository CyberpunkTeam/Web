import './style.css';
import SideBar from "../../components/SideBar";
import {useNavigate} from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import {AddCircle} from "iconsax-react";

export default function ProjectsScreen() {
    const navigate = useNavigate();

    const projectsView = () => {

        const numbers = [
            {
                "name": "Projecto 1",
                "owner": "Juan Perez",
                "tech": ["Python", "React"]
            },
            {
                "name": "Projecto 2",
                "owner": "Juan Perez",
                "tech": ["Go"]
            },
            {
                "name": "Projecto 3",
                "owner": "Juan Perez",
                "tech": ["Python"]
            },
            {
                "name": "Projecto 3",
                "owner": "Juan Perez",
                "tech": ["Python"]
            }
        ]

        const tag = (value) => {
            return (
                <div id={value} className={"modal-tag"}>
                    {value}
                </div>
            )
        }


        const projectCard = (data) => {
            return (
                <div className="project-card-container">
                    <div className="project-card">
                        {data.name}
                        <div className="project-info">
                            <div className="titles">
                                Creador: {data.owner}
                            </div>
                            <div className="project-tech-info">
                                <div className="titles">
                                    Tecnologías:
                                </div>
                                {data.tech.map((info) => {
                                    return tag(info)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="projects-card-container">
                {numbers.map((data) => {
                    return projectCard(data)
                })}
            </div>
        )
    }

    const mostPopular = () => {
        return (
            <div className="most-popular-card-container">
                <div className="popular-card">
                    Más Populares
                    <>
                    </>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="projects-screen">
                <div className="projects-header">
                    Proyectos
                    <AddCircle size="24" color="#B1B1B1" className="create-project-button" onClick={() => {navigate(("/projects/new"))}}/>
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
