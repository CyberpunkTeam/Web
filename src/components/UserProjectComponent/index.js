import {AddCircle, LampCharge} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import {isMobile} from "react-device-detect";

export default function UserProjectComponent(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    if (Object.keys(params.userData).length === 0) {
        return;
    }

    const createProject = () => {
        navigate("/projects/new")
    }

    const projectView = (data) => {
        const projects_link = "/projects/" + data.pid
        const goTo = () => {
            navigate(projects_link)
        }

        return (
            <div className={isMobile ? "project-info-mobile" : context.size ? "data-info-reduce" : "data-info-with-shadow"} onClick={goTo}>
                <Link to={projects_link} className={isMobile ? "team-link-mobile" : "team-link"}>
                    {data.name}
                </Link>
                <div className={isMobile ? "coverProjectMobile" : "coverProject"}>
                    <div className={isMobile ? "statusMobile" : "status"}>
                        {data.state}
                    </div>
                    <div className="tags-project">
                        {data.technologies.map((technology) => {
                            return <TechnologyTag key={technology} technology={technology}/>
                        })}
                    </div>
                    <div className="tags-project">
                        {data.idioms.map((preference) => {
                            return <PreferenceTag key={preference} preference={preference}/>
                        })}
                    </div>
                </div>
                <div className={isMobile ? "projectDescriptionMobile" : "projectDescription"}>
                    {data.description.substring(0, 120)}
                </div>
            </div>
        )
    }

    if (params.userData.projects.length === 0) {
        if (params.userData.user.uid !== context.user.uid) {
            return
        }

        return (
            <div className="experience-empty-container">
                <div className={isMobile ? "experience-empty-title-mobile" : "experience-empty-title"}>
                    <LampCharge size={isMobile ? "56" : "32"} color="#014751" className={"icon"}/>
                    Crear Proyecto
                </div>
                <AddCircle size={isMobile ? "56" : "24"} color="#B1B1B1" onClick={createProject}/>
            </div>
        )
    }

    const addButton = () => {
        if (params.userData.user.uid !== context.user.uid) {
            return
        }

        if (isMobile) {
            return (
                <button className="createTeamButtonMobile" onClick={createProject}>
                    <AddCircle color="#FAFAFA" variant="Bold" size={48}/>
                </button>
            )
        }

        return (
            <button className="createTeamButton" onClick={createProject}>
                <AddCircle color="#FAFAFA" variant="Bold" size={40} className="icon"/>
                Crear Proyecto
            </button>
        )
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

    const projects = () => {
        if (isMobile || context.size) {
            return (params.userData.projects.map((data) => {
                    return projectView(data)
                })
            )
        }

        return (
            formatProjects(params.userData.projects).map((value, index) => {
                    if (value.length === 1) {
                        return (
                            <div className={"row"}>
                                {projectView(value[0])}
                            </div>
                        )
                    }
                    return (
                        <div className={"row"}>
                            {projectView(value[0])}
                            {projectView(value[1])}
                        </div>
                    )
                }
            )
        )
    }


    return (
        <div className={"user-team-container"}>
            {addButton()}
            {projects()}
        </div>
    )
}
