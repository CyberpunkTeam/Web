import '../ProjectPostulationsModal/style.css'

import {Link} from "react-router-dom";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import {useState} from "react";
import moment from "moment/moment";

export default function PostulationViewModal(params) {

    const [showMore, setShowMore] = useState(false);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const formatDate = (date) => {
        const d = date.replace(/:/, ' ');
        return moment.utc(d, 'DD/MM/YYYY hh:mm:ss').fromNow();
    }

    if (params.data.state !== params.filter) {
        return
    }

    const project = "/projects/" + params.data.project.pid
    return (
        <div key={params.data.ppid} className="team-data-info">
            <div className="title-and-budget">
                <Link to={project} className="project-link-view">
                    {params.data.project.name}
                </Link>
                <div>
                    <div className="estimated_budget">
                        {formatter.format(params.data.estimated_budget)} USD
                    </div>
                </div>
            </div>
            <div className="line">
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
                <div className="description-modal" onClick={() => {setShowMore(!showMore)}}>
                    {showMore ? params.data.proposal_description.substring(0, params.data.proposal_description.length) : params.data.proposal_description.substring(0, 198)}
                    {showMore || params.data.proposal_description.length < 198 ? "" : "..."}
                </div>
                <div className="date-project">
                    {formatDate(params.data.created_date)}
                </div>
            </div>
        </div>
    )
}
