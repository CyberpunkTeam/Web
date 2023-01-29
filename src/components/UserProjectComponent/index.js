import {AddCircle} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {isMobile} from "react-device-detect";
import ProjectTileComponent from "../ProjectTileComponent";

export default function UserProjectComponent(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const createProject = () => {
        navigate("/projects/new")
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
                                <ProjectTileComponent data={value[0]} />
                            </div>
                        )
                    }
                    return (
                        <div key={value} className={"row"}>
                            <ProjectTileComponent data={value[0]} />
                            <ProjectTileComponent data={value[1]} />
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
