import {isMobile} from "react-device-detect";
import {Link, useNavigate} from "react-router-dom";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import {useContext} from "react";
import AppContext from "../../utils/AppContext";

export default function TeamProjectTileComponent(params) {
    const data = params.data.project
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const projects_link = "/projects/" + data.pid
    const goTo = () => {
        navigate(projects_link)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div key={data.pid}
             className={isMobile ? "project-info-mobile" : context.size ? "data-info-reduce" : "data-info-reduce-project"}
             onClick={goTo}>
            <Link to={projects_link} className={isMobile ? "team-link-mobile" : "team-link"}>
                {data.name}
            </Link>
            <div className={isMobile ? "coverProjectMobile" : "coverProject"}>
                <div className={isMobile ? "statusMobile" : "status"}>
                    {formatter.format(params.data.estimated_budget)} USD
                </div>
                <div className="tags-project">
                    {data.technologies.map((technology) => {
                        return <TechnologyTag key={technology} technology={technology}/>
                    })}
                </div>
                <div className="tags-project">
                    {data.idioms.map((preference) => {
                        return <PreferenceTag key={preference} preference={preference}/>
                    })}
                </div>
            </div>
            <div className={isMobile ? "projectDescriptionMobile" : "projectDescription"}>
                {data.description.substring(0, 120)}
            </div>
        </div>
    )
}
