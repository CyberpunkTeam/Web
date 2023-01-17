import './style.css'

import {Link} from "react-router-dom";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import {useContext, useState} from "react";
import {formatDate} from "../../utils/dateFormat";
import AppContext from "../../utils/AppContext";

export default function TeamPostulationView(params) {

    const [showMore, setShowMore] = useState(false);
    let context = useContext(AppContext);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const seeMore = () => {
        setShowMore(!showMore)
    }

    if (params.data.state !== params.filter) {
        return
    }

    const project = "/projects/" + params.data.project.pid
    return (
        <div key={params.data.ppid} className="teamPostulationContainer">
            <div className={context.size ? "teamPostulationInfoReduce" : "teamPostulationInfo"}>
                <div className={context.size ? "postulationInfoReduce" : "postulationInfo"}>
                    <div className="title-and-budget">
                        <Link to={project} className="projectTitle">
                            {params.data.project.name}
                        </Link>
                        <div className="estimated_budget">
                            {formatter.format(params.data.estimated_budget)} USD
                        </div>
                    </div>
                    <div className="tags-modal">
                        {params.data.project.technologies.map((data) => {
                            return <TechnologyTag key={data + "-modal"} technology={data}/>
                        })}
                    </div>
                    <div className="tags-modal">
                        {params.data.project.idioms.map((data) => {
                            return <PreferenceTag key={data + "-modal"} preference={data}/>
                        })}
                    </div>
                </div>
                <div className={context.size ? "descriptionContainerReduced" : "descriptionContainer"}>
                    Descripción enviada
                    <div className="description-modal">
                        {showMore ? params.data.proposal_description.substring(0, params.data.proposal_description.length) : params.data.proposal_description.substring(0, 600)}
                        {showMore || params.data.proposal_description.length < 600 ? "" : "..."}
                    </div>
                    <div className={"seeMore"} onClick={seeMore}>
                        {params.data.proposal_description.length < 600 ? null : !showMore ?
                            "Ver Más" : "Ver Menos"}
                    </div>
                    <div className="date-project">
                        {formatDate(params.data.created_date)}
                    </div>
                </div>
            </div>
        </div>
    )
}
