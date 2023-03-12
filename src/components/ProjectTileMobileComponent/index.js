import {isMobile} from "react-device-detect";
import {useNavigate} from "react-router-dom";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import FrameworkTag from "../FrameworkTag";
import PlatformTag from "../PlatformTag";
import {formatter} from "../../utils/budgetFormatter";
import {Bitcoin, Box1, ChartSquare, CpuSetting, Hex, Mobile, Monitor, Scroll} from "iconsax-react";
import CloudTag from "../CloudTag";
import {useContext} from "react";
import AppContext from "../../utils/AppContext";

export default function ProjectTileMobileComponent(params) {
    const data = params.data
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const projects_link = "/projects/" + data.pid
    const state = (data.state.slice(0, 1) + data.state.slice(1, data.state.length).toLowerCase()).replace("_", " ")
    const goTo = () => {
        navigate(projects_link)
    }

    const projectTileIcon = () => {
        switch (data.project_type) {
            case 'Backend':
                return <Scroll size={isMobile ? "48" : "24"} color="#FAFAFA" className={isMobile ? "type-icon-mobile": "type-icon"}/>
            case 'Web':
                return <Monitor size={isMobile ? "48" : "24"} color="#FAFAFA" className={isMobile ? "type-icon-mobile": "type-icon"}/>
            case 'Mobile':
                return <Mobile size={isMobile ? "48" : "24"} color="#FAFAFA" className={isMobile ? "type-icon-mobile": "type-icon"}/>
            case 'Crypto':
                return <Bitcoin size={isMobile ? "48" : "24"} color="#FAFAFA" className={isMobile ? "type-icon-mobile": "type-icon"}/>
            case 'Data Analytics':
                return <ChartSquare size={isMobile ? "48" : "24"} color="#FAFAFA" className={isMobile ? "type-icon-mobile": "type-icon"}/>
            case 'Data Science':
                return <Hex size={isMobile ? "48" : "24"} color="#FAFAFA" className={isMobile ? "type-icon-mobile": "type-icon"}/>
            case 'Data Engineering':
                return <CpuSetting size={isMobile ? "48" : "24"} color="#FAFAFA" className={isMobile ? "type-icon-mobile": "type-icon"}/>
            default:
                return <Box1 size={isMobile ? "48" : "24"} color="#FAFAFA" className={isMobile ? "type-icon-mobile": "type-icon"}/>
        }
    }

    const tags = () => {
        if (isMobile) {
            return (
                <div className={"tags-container-tile"}>
                    <div className="tags-project">
                        {data.technologies.programming_language.map((technology) => {
                            return <TechnologyTag key={technology} technology={technology}/>
                        })}
                    </div>
                    <div className="tags-project">
                        {data.technologies.frameworks.map((data) => {
                            return <FrameworkTag key={data} framework={data}/>
                        })}
                    </div>
                    <div className="tags-project">
                        {data.technologies.platforms.map((data) => {
                            return <PlatformTag key={data} platform={data}/>
                        })}
                    </div>
                    <div className="tags-project">
                        {data.technologies.databases.map((data) => {
                            return <CloudTag key={data} cloud={data}/>
                        })}
                    </div>
                    <div className="tags-project">
                        {data.idioms.map((preference) => {
                            return <PreferenceTag key={preference} preference={preference}/>
                        })}
                    </div>
                </div>
            )
        }
        return (
            <div className={"tags-container-tile"}>
                <div className="tags-project">
                    {data.technologies.programming_language.map((technology) => {
                        return <TechnologyTag key={technology} technology={technology}/>
                    })}
                    {data.technologies.frameworks.map((data) => {
                        return <FrameworkTag key={data} framework={data}/>
                    })}
                </div>
                <div className="tags-project">
                    {data.technologies.platforms.map((data) => {
                        return <PlatformTag key={data} platform={data}/>
                    })}
                    {data.technologies.databases.map((data) => {
                        return <CloudTag key={data} cloud={data}/>
                    })}
                </div>
                <div className="tags-project">
                    {data.idioms.map((preference) => {
                        return <PreferenceTag key={preference} preference={preference}/>
                    })}
                </div>
            </div>
        )
    }


    return (
        <div>
            <div className={isMobile ? "coverProjectMobile" : "coverProject"} onClick={goTo}>
                <div className={isMobile ? "project-tile-title-container-mobile" : "project-tile-title-container"}>
                    {data.name}
                    <div className={isMobile || context.size ? "status-tag-container-mobile" : "status-tag-container"}>
                        <div className={"status-tag-container"}>
                            {projectTileIcon()}
                            <div className={isMobile ? "status-tag-mobile" : "status-tag"}>
                                {state}
                            </div>
                        </div>
                        <div className={isMobile ? "status-tag-mobile" : "status-tag"}>
                            {formatter.format(data.tentative_budget) + " USD"}
                        </div>
                    </div>
                </div>
                {tags()}
            </div>
            <div className={isMobile ? "projectDescriptionMobile" : "projectDescription"}>
                {data.description.summary.substring(0, context.size ? 140 : 320)}{data.description.summary.length > (context.size ? 140 : 320) ? "..." : null}
            </div>
        </div>
    )
}
