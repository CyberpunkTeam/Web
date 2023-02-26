import './style.css'

import {Link} from "react-router-dom";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import {useContext, useState} from "react";
import {formatDate} from "../../utils/dateFormat";
import AppContext from "../../utils/AppContext";
import {formatter} from "../../utils/budgetFormatter";
import {isMobile} from "react-device-detect";
import FrameworkTag from "../FrameworkTag";
import PlatformTag from "../PlatformTag";
import CloudTag from "../CloudTag";

export default function TeamPostulationView(params) {

    const [showMore, setShowMore] = useState(false);
    let context = useContext(AppContext);

    const seeMore = () => {
        setShowMore(!showMore)
    }

    if (params.data.state !== params.filter) {
        return
    }

    const project = "/projects/" + params.data.project.pid
    return (
        <div key={params.data.ppid} className="teamPostulationContainer">
            <div className={isMobile ? "teamPostulationInfoMobile" : context.size ? "teamPostulationInfoReduce" : "teamPostulationInfo"}>
                <div className={isMobile ? "postulationInfoMobile" :  context.size ? "postulationInfoReduce" : "postulationInfo"}>
                    <div className={isMobile ? "title-and-budget-mobile" : "title-and-budget"}>
                        <Link to={project} className="projectTitle">
                            {params.data.project.name}
                        </Link>
                        <div className={isMobile ? "estimated_budget-mobile" : "estimated_budget"}>
                            {formatter.format(params.data.estimated_budget)} USD
                        </div>
                    </div>
                    <div className={"team-tags"}>
                        <div className="tags-modal">
                            {params.data.project.technologies.programming_language.map((data) => {
                                return <TechnologyTag key={data + "-modal"} technology={data}/>
                            })}
                        </div>
                        <div className="tags-modal">
                            {params.data.project.technologies.frameworks.map((data) => {
                                return <FrameworkTag key={data + "-modal"} framework={data}/>
                            })}
                        </div>
                        <div className="tags-modal">
                            {params.data.project.technologies.platforms.map((data) => {
                                return <PlatformTag key={data + "-modal"} platform={data}/>
                            })}
                        </div>
                        <div className="tags-modal">
                            {params.data.project.technologies.databases.map((data) => {
                                return <CloudTag key={data + "-modal"} cloud={data}/>
                            })}
                        </div>
                        <div className="tags-modal">
                            {params.data.project.idioms.map((data) => {
                                return <PreferenceTag key={data + "-modal"} preference={data}/>
                            })}
                        </div>
                    </div>
                </div>
                <div className={isMobile ? "descriptionContainerMobile" : context.size ? "descriptionContainerReduced" : "descriptionContainer"}>
                    Description Sent
                    <div className="description-modal">
                        {showMore ? params.data.proposal_description.substring(0, params.data.proposal_description.length) : params.data.proposal_description.substring(0, 600)}
                        {showMore || params.data.proposal_description.length < 600 ? "" : "..."}
                    </div>
                    <div className={"seeMore"} onClick={seeMore}>
                        {params.data.proposal_description.length < 600 ? null : !showMore ?
                            "Show More" : "Show Less"}
                    </div>
                    <div className={isMobile ? "date-project-mobile" : "date-project"}>
                        {formatDate(params.data.created_date)}
                    </div>
                </div>
            </div>
        </div>
    )
}
