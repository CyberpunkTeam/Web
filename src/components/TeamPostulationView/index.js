import './style.css'

import {Link} from "react-router-dom";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import {useState} from "react";
import moment from "moment/moment";
import {ArrowCircleDown, ArrowCircleUp} from "iconsax-react";

export default function TeamPostulationView(params) {

    const [showMore, setShowMore] = useState(false);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const seeMore = () => {
        setShowMore(!showMore)
    }

    const formatDate = (date) => {
        const d = date.replace(/:/, ' ');
        return moment.utc(d, 'DD/MM/YYYY hh:mm:ss').fromNow();
    }

    if (params.data.state !== params.filter) {
        return
    }

    const project = "/projects/" + params.data.project.pid
    return (
        <div key={params.data.ppid} className="teamPostulationContainer">
            <div className="teamPostulationInfo">
                <div className="postulationInfo">
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
                <div className="descriptionContainer">
                    Descripción enviada
                    <div className="description-modal">
                        {showMore ? params.data.proposal_description.substring(0, params.data.proposal_description.length) : params.data.proposal_description.substring(0, 600)}
                        {showMore || params.data.proposal_description.length < 600 ? "" : "..."}
                    </div>
                    {params.data.proposal_description.length < 600 ? null : !showMore ?
                        <ArrowCircleDown color="#B1B1B1" size={24} className={"seeMore"} onClick={seeMore}/> :
                        <ArrowCircleUp color="#B1B1B1" size={24} className={"seeMore"} onClick={seeMore}/>
                    }
                    <div className="date-project">
                        {formatDate(params.data.created_date)}
                    </div>
                </div>
            </div>
        </div>
    )
}
