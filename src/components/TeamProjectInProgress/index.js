import './style.css'
import {isMobile} from "react-device-detect";
import {LampCharge} from "iconsax-react";
import {useContext} from "react";
import AppContext from "../../utils/AppContext";

export default function TeamProjectInProgress() {
    let context = useContext(AppContext);

    return (
        <div className={context.size ? "teamProjectsInProgressContainerReduced" : "teamProjectsInProgressContainer"}>
            <div className={"teamInformationTitleContainer"}>
                <div className={isMobile ? "teamInformationTitleMobile" : "teamInformationTitle"}>
                    <LampCharge size={isMobile ? "80" : "32"} color="#FAFAFA" className="icon"/>
                    Projects In Progress
                </div>
            </div>
        </div>
    )

}
