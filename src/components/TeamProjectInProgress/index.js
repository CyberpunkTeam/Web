import './style.css'
import {isMobile} from "react-device-detect";
import {LampCharge} from "iconsax-react";
import {useContext} from "react";
import AppContext from "../../utils/AppContext";
import TeamProjectTileComponent from "../TeamProjectTileComponent";

export default function TeamProjectInProgress(params) {
    let context = useContext(AppContext);

    return (
        <div
            className={context.size ? "teamProjectsInProgressInfoContainerReduced" : "teamProjectsInProgressInfoContainer"}>
            <div
                className={context.size ? "teamProjectsInProgressContainerReduced" : "teamProjectsInProgressContainer"}>
                <div className={"teamInformationTitleContainer"}>
                    <div className={isMobile ? "teamInformationTitleMobile" : "teamInformationTitle"}>
                        <LampCharge size={isMobile ? "80" : "32"} color="#FAFAFA" className="icon"/>
                        Projects In Progress
                    </div>
                </div>
            </div>
            {params.projects.map((value) => {
                if (value.project.state !== "PENDING" && value.project.state !== "FINISHED" && value.state === "ACCEPTED") {
                    return <TeamProjectTileComponent key={value} data={value}/>
                }
            })}
        </div>
    )

}
