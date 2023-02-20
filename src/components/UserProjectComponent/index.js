import {AddCircle} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import ProjectTileComponent from "../ProjectTileComponent";
import {formatProjects} from "../../utils/formatProjects";

export default function UserProjectComponent(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const createProject = () => {
        navigate("/new/projects/type")
    }

    const addButton = () => {
        if (params.userData.user.uid !== context.user.uid) {
            return
        }

        return (
            <button className="createTeamButton" onClick={createProject}>
                <AddCircle color="#FAFAFA" variant="Bold" size={32} className="icon"/>
                New Project
            </button>
        )
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
                                <ProjectTileComponent data={value[0]}  position={"left"}/>
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
        <div className={"user-team-container"}>
            {addButton()}
            {projects()}
        </div>
    )

}
