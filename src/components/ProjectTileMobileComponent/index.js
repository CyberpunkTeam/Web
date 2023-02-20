import {isMobile} from "react-device-detect";
import {useNavigate} from "react-router-dom";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import FrameworkTag from "../FrameworkTag";
import PlatformTag from "../PlatformTag";
import {formatter} from "../../utils/budgetFormatter";
import {Bitcoin, Box1, ChartSquare, CpuSetting, Hex, Mobile, Monitor, Scroll} from "iconsax-react";

export default function ProjectTileMobileComponent(params) {
    const data = params.data
    const navigate = useNavigate();
    const projects_link = "/projects/" + data.pid
    const state = (data.state.slice(0,1) + data.state.slice(1,data.state.length).toLowerCase()).replace("_", " ")
    const goTo = () => {
        navigate(projects_link)
    }

    const projectTileIcon = () => {
        switch (data.project_type) {
            case 'Backend':
                return <Scroll size={isMobile ? "48" : "24"} color="#FAFAFA"/>
            case 'Web':
                return <Monitor size={isMobile ? "48" : "24"} color="#FAFAFA"/>
            case 'Mobile':
                return <Mobile size={isMobile ? "48" : "24"} color="#FAFAFA"/>
            case 'Crypto':
                return <Bitcoin size={isMobile ? "48" : "24"} color="#FAFAFA"/>
            case 'Data Analytics':
                return <ChartSquare size={isMobile ? "48" : "24"} color="#FAFAFA"/>
            case 'Data Science':
                return <Hex size={isMobile ? "48" : "24"} color="#FAFAFA"/>
            case 'Data Engineering':
                return <CpuSetting size={isMobile ? "48" : "24"} color="#FAFAFA"/>
            default:
                return <Box1 size={isMobile ? "48" : "24"} color="#FAFAFA"/>
        }
    }

    return (
        <div>
            <div className={isMobile ? "coverProjectMobile" : "coverProject"} onClick={goTo}>
                <div className={isMobile ? "project-tile-title-container-mobile" : "project-tile-title-container"}>
                    {data.name}
                    <div className={"status-tag-container"}>
                        {projectTileIcon()}
                        <div className={isMobile ? "status-tag-mobile" : "status-tag"}>
                            {state}
                        </div>
                        <div className={isMobile ? "status-tag-mobile" : "status-tag"}>
                            {formatter.format(data.tentative_budget) + " USD"}
                        </div>
                    </div>
                </div>
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
                    </div>
                    <div className="tags-project">
                        {data.idioms.map((preference) => {
                            return <PreferenceTag key={preference} preference={preference}/>
                        })}
                    </div>
                </div>
            </div>
            <div className={isMobile ? "projectDescriptionMobile" : "projectDescription"}>
                {data.description.summary.substring(0, 120)}
            </div>
        </div>
    )
}
