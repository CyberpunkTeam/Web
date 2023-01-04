import {Link} from "react-router-dom";
import PreferenceTag from "../PreferenceTag";
import TechnologyTag from "../TechnologyTag";
import {CloseCircle} from "iconsax-react";

export default function ProjectsModal(params) {
    const projects = params.projects
    const teamView = (data) => {
        const team_link = "/projects/" + data.pid
        return (
            <div key={data.pid} className="team-data-info">
                <Link to={team_link} className="team-link-teams-view">
                    {data.name}
                </Link>
                <div className="line">
                    <div className="tags-modal">
                        {data.technologies.map((data) => {
                            return <TechnologyTag technology={data}/>
                        })}
                    </div>
                    <div className="tags-modal">
                        {data.idioms.map((data) => {
                            return <PreferenceTag preference={data}/>
                        })}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="modal-container">
            <div className="form-text">
                Proyectos
            </div>
            <div className="scrollDiv">
                {projects.map((data) => {
                    return teamView(data)
                })}
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )
}
