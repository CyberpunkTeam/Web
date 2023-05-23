import './style.css'
import {isMobile} from "react-device-detect";
import {LampCharge} from "iconsax-react";
import {useContext} from "react";
import AppContext from "../../utils/AppContext";
import ProjectTileMobileComponent from "../ProjectTileMobileComponent";

export default function TeamProjectInProgress(params) {
    let context = useContext(AppContext);

    const activeProjects = () => {
        let count = 0
        params.projects.forEach((value) => {
            if (value.project.state !== "PENDING" && value.project.state !== "FINISHED" && value.state === "ACCEPTED") {
                count++;
            }
        })
        return count
    }

    return (
        <div
            className={isMobile || context.size ? "teamProjectsInProgressInfoContainerReduced" : "teamProjectsInProgressInfoContainer"}>
            <div
                className={isMobile ? "teamProjectsInProgressContainerMobile" : context.size ? "teamProjectsInProgressContainerReduced" : "teamProjectsInProgressContainer"}>
                <div className={"teamInformationTitleContainer"}>
                    <div className={isMobile ? "teamInformationTitleMobile" : "teamInformationTitle"}>
                        <LampCharge size={isMobile ? "80" : "32"} color="#FAFAFA" className="icon"/>
                        {activeProjects() === 0 ? "Without Projects In Progress" : "Projects In Progress"}
                    </div>
                </div>
            </div>
            <div className={"projects"}>
                {params.projects.map((value) => {
                    value.project.tentative_budget = value.estimated_budget
                    if (value.project.state !== "PENDING" && value.project.state !== "FINISHED" && value.state === "ACCEPTED") {
                        return <ProjectTileMobileComponent key={value} data={value.project}/>
                    }
                    return null
                })}
            </div>
        </div>
    )

}
