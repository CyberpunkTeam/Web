import './style.css';
import SideBar from "../../components/SideBar";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/loading";
import {useContext, useEffect, useState} from "react";
import SearchBar from "../../components/SearchBar";
import NotFound from "../NotFound";
import {getProject} from "../../services/projectService";
import {Edit} from "iconsax-react";
import AppContext from "../../utils/AppContext";

export default function ProjectScreen() {
    const params = useParams();
    const navigate = useNavigate();
    let context = useContext(AppContext);
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
        const editButton = () => {
            if (project.creator.uid === context.user.uid) {
                const edit = () => {
                    navigate(`/projects/${project.pid}/edit`, {state: {project}})
                }

                return (
                    <div className="edit-button" onClick={edit}>
                        <Edit size="24" color="#014751"/>
                    </div>
                )
            }
        }

        return (
            <div className="cover-container">
                <div className="project-title-container">
                    <div className="team-name">
                        {project.name}
                    </div>
                    <div className="tags-container">
                        {project.technologies.map((data) => {
                            return (tech_tag(data))
                        })}
                        {project.idioms.map((data) => {
                            return (pref_tag(data))
                        })}
                    </div>
                    <div className="creator">
                        {project.creator.name} {project.creator.lastname}
                    </div>
                </div>
                {editButton()}
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
