import {AddCircle} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {isMobile} from "react-device-detect";
import ProjectTileMobileComponent from "../ProjectTileMobileComponent";

export default function UserProjectMobileComponent(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const createProject = () => {
        navigate("/new/projects/type")
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

    const noData = () => {
        if (params.userData.projects.length === 0) {
            return (
                <div className={"no-data-tag"}>
                    No projects available
                </div>
            )
        }
    }


    return (
        <div className={"user-team-container"}>
            {addButton()}
            {noData()}
            {params.userData.projects.map((data) => {
                return <ProjectTileMobileComponent key={data.pid} data={data}/>
            })}
        </div>
    )

}
