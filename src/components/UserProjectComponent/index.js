import {AddCircle} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import {isMobile} from "react-device-detect";

export default function UserProjectComponent(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const createProject = () => {
        navigate("/projects/new")
    }

    const projectView = (data) => {
        const projects_link = "/projects/" + data.pid
        const goTo = () => {
            navigate(projects_link)
        }

        return (
            <div key={data.pid}
                 className={isMobile ? "project-info-mobile" : context.size ? "data-info-reduce" : "data-info-with-shadow"}
                 onClick={goTo}>
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
                <AddCircle color="#FAFAFA" variant="Bold" size={32} className="icon"/>
                New Project
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
        const projectFormatted = formatProjects(params.userData.projects)

        if (projectFormatted[0].length === 0) {
            return
        }

        return (
            projectFormatted.map((value, index) => {
                    if (value.length === 1) {
                        return (
                            <div key={value} className={"row"}>
                                {projectView(value[0])}
                            </div>
                        )
                    }
                    return (
                        <div key={value} className={"row"}>
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
