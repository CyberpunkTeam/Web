import {isMobile} from "react-device-detect";
import {useNavigate} from "react-router-dom";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import FrameworkTag from "../FrameworkTag";
import PlatformTag from "../PlatformTag";
import {formatter} from "../../utils/budgetFormatter";
import {Bitcoin, Box1, ChartSquare, CpuSetting, Hex, Mobile, Monitor, Scroll} from "iconsax-react";
import CloudTag from "../CloudTag";
import React, {useContext} from "react";
import AppContext from "../../utils/AppContext";
import crypto from "../../assests/Crypto.jpg";
import mobile from "../../assests/mobile.jpg";
import backend from "../../assests/Backend.jpg";
import dataA from "../../assests/DataA.jpg";
import dataS from "../../assests/DataS.jpg";
import dataE from "../../assests/DataEng.jpg";

export default function ProjectTileMobileComponent(params) {
    const data = params.data
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const projects_link = "/projects/" + data.pid
    const state = (data.state.slice(0, 1) + data.state.slice(1, data.state.length).toLowerCase()).replace("_", " ")
    const goTo = () => {
        navigate(projects_link)
    }

    const coverImageType = () => {
        switch (data.project_type) {
            case 'Backend':
                return backend
            /*case 'Web':
                return <Monitor size={isMobile ? "48" : "24"} color="#FAFAFA"
                                className={isMobile ? "type-icon-mobile" : "type-icon"}/>*/
            case 'Mobile':
                return mobile
            case 'Crypto':
                return crypto
            case 'Data Analytics':
                return dataA
            case 'Data Science':
                return dataS
            case 'Data Engineering':
                return dataE
            default:
                return "https://scopeblog.stanford.edu/wp-content/uploads/2020/08/chris-ried-ieic5Tq8YMk-unsplash-1024x684.jpg"
        }
    }

    const coverImage = () => {
        return <img src={coverImageType()}
                    className={isMobile ? "coverProjectImageMobile" : context.size ? "coverProjectImageReduced" : "coverProjectImage"}
                    alt=""/>
    }

    const projectTileIcon = () => {
        switch (data.project_type) {
            case 'Backend':
                return <Scroll size={isMobile ? "48" : "24"} color="#FAFAFA"
                               className={isMobile ? "type-icon-mobile" : null}/>
            case 'Web':
                return <Monitor size={isMobile ? "48" : "24"} color="#FAFAFA"
                                className={isMobile ? "type-icon-mobile" : null}/>
            case 'Mobile':
                return <Mobile size={isMobile ? "48" : "24"} color="#FAFAFA"
                               className={isMobile ? "type-icon-mobile" : null}/>
            case 'Crypto':
                return <Bitcoin size={isMobile ? "48" : "24"} color="#FAFAFA"
                                className={isMobile ? "type-icon-mobile" : null}/>
            case 'Data Analytics':
                return <ChartSquare size={isMobile ? "48" : "24"} color="#FAFAFA"
                                    className={isMobile ? "type-icon-mobile" : null}/>
            case 'Data Science':
                return <Hex size={isMobile ? "48" : "24"} color="#FAFAFA"
                            className={isMobile ? "type-icon-mobile" : null}/>
            case 'Data Engineering':
                return <CpuSetting size={isMobile ? "48" : "24"} color="#FAFAFA"
                                   className={isMobile ? "type-icon-mobile" : null}/>
            default:
                return <Box1 size={isMobile ? "48" : "24"} color="#FAFAFA"
                             className={isMobile ? "type-icon-mobile" : null}/>
        }
    }

    const tags = () => {
        return (
            <div className={"project-tile-tags"}>
                {data.technologies.programming_language.map((data) => {
                    return <TechnologyTag key={data} technology={data}/>
                })}
                {data.technologies.frameworks.map((data) => {
                    return <FrameworkTag key={data} framework={data}/>
                })}
                {data.technologies.platforms.map((data) => {
                    return <PlatformTag key={data} platform={data}/>
                })}
                {data.technologies.databases.map((data) => {
                    return <CloudTag key={data} cloud={data}/>
                })}
                {data.idioms.map((data) => {
                    return <PreferenceTag key={data} preference={data}/>
                })}
                {data.description.non_function_requirements.map((data) => {
                    return <PreferenceTag key={data} preference={data}/>
                })}
            </div>
        )
    }

    return (
        <div className={isMobile ? "coverProjectMobile" : "coverProject"} onClick={goTo}>
            <div className={isMobile ? "project-tile-info-mobile" : "project-tile-info"}>
                <div className={isMobile ? "project-tile-title-container-mobile" : "project-tile-title-container"}>
                    {data.name}
                    <div className={isMobile || context.size ? "status-tag-container-mobile" : "status-tag-container"}>
                        <div className={"status-tag-container"}>
                            {projectTileIcon()}
                            <div
                                className={isMobile ? data.internal_state === "BLOCKED" ? "status-blocked-tag-mobile" : "status-tag-mobile"
                                    : data.internal_state === "BLOCKED" ? "status-blocked-tag" : "status-tag"}>
                                {data.internal_state === "BLOCKED" ? "Blocked" : state}
                            </div>
                        </div>
                        <div
                            className={isMobile ? "status-tag-mobile" : context.size ? "status-tag-reduced" : "status-tag"}>
                            {formatter.format(data.tentative_budget) + " USD"}
                        </div>
                    </div>
                </div>
                {tags()}
                <div className={isMobile ? "projectDescriptionMobile" : "projectDescription"}>
                    {data.description.summary.length <= 1 ? "Without Description" : "Description"}
                    <div className={isMobile ? "descriptionApplicationMobile" : "descriptionApplication"}>
                        {data.description.summary.substring(0, context.size ? 140 : 320)}{data.description.summary.length > (context.size ? 140 : 320) ? "..." : null}
                    </div>
                </div>
            </div>
            {coverImage()}
        </div>
    )
}
