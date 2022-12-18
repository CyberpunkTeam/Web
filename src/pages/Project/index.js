import './style.css';
import SideBar from "../../components/SideBar";
import {useParams} from "react-router-dom";
import Loading from "../../components/loading";
import {useEffect, useState} from "react";
import SearchBar from "../../components/SearchBar";
import NotFound from "../NotFound";
import {getProject} from "../../services/projectService";

export default function ProjectScreen() {
    const params = useParams();
    const [project, setProject] = useState(undefined)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProject(params.id).then((response) => {
            setProject(response)
            setLoading(false);
        }).catch((error) => {
            console.log(error)
        });
    }, [params.id]);

    if (loading) {
        return <Loading/>
    }

    const tech_tag = (technology) => {
        return (
            <div key={technology} className={"tech-tag"}>
                {technology}
            </div>
        )
    }

    const pref_tag = (preference) => {
        return (
            <div key={preference} className={"pref-tag"}>
                {preference}
            </div>
        )
    }

    const cover = () => {
        return (
            <div className="cover-container">
                <div className="project-title-container">
                    <h1 className="team-name">
                        {project.name}
                    </h1>
                    <div className="tags-container">
                        {project.technologies.map((data) => {
                            return (tech_tag(data))
                        })}
                        {project.idioms.map((data) => {
                            return (pref_tag(data))
                        })}
                    </div>
                </div>
            </div>
        )
    }

    if (project.pid === undefined) {
        return (
            <NotFound/>
        )
    }

    const information = () => {
        return (
            <div className="project-information-container">
                <div className="project-information-card">
                    Descripción
                    <div className="project-description-card">
                        {project.description}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="team-screen">
            <div className="team-container">
                {cover()}
            </div>
            <div className="project-data-container">
                {information()}
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    )
}
