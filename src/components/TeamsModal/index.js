import {Link} from "react-router-dom";
import {CloseCircle, Star1} from "iconsax-react";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";

export default function TeamsModal(params) {
    const teams = params.teams
    const teamView = (data) => {
        const team_link = "/team/" + data.tid
        return (
            <div key={data.tid} className="team-data-info">
                <Link to={team_link} className="team-link-teams-view">
                    {data.name}
                </Link>
                <div className="rank-team-view">
                    <Star1 size="16" color="#2E9999" variant="Bold" className={"icon"}/>
                    5.0
                </div>
                <div className="line">
                    <div className="tags-modal">
                        {data.technologies.map((data) => {
                            return <TechnologyTag key={data + "-modal"} technology={data}/>
                        })}
                    </div>
                    <div className="tags-modal">
                        {data.project_preferences.map((data) => {
                            return <PreferenceTag key={data + "-modal"} preference={data}/>
                        })}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="modal-container">
            <div className="form-text">
                Equipos
            </div>
            <div className="scrollDiv">
                {teams.map((data) => {
                    return teamView(data)
                })}
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )

}
