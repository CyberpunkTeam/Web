import {isMobile} from "react-device-detect";
import {Link, useNavigate} from "react-router-dom";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import FrameworkTag from "../FrameworkTag";
import PlatformTag from "../PlatformTag";

export default function ProjectTileMobileComponent(params) {
    const data = params.data
    const navigate = useNavigate();
    const projects_link = "/projects/" + data.pid
    const goTo = () => {
        navigate(projects_link)
    }

    return (
        <div key={data.pid}
             className={isMobile ? "project-info-mobile" : "data-info-reduce"}
             onClick={goTo}>
            <Link to={projects_link} className={isMobile ? "team-link-mobile" : "team-link"}>
                {data.name}
            </Link>
            <div className={isMobile ? "coverProjectMobile" : "coverProject"}>
                <div className={isMobile ? "statusMobile" : "status"}>
                    {data.state}
                </div>
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
            <div className={isMobile ? "projectDescriptionMobile" : "projectDescription"}>
                {data.description.summary.substring(0, 120)}
            </div>
        </div>
    )
}
