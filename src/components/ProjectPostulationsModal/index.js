import {useState} from "react";
import PostulationViewModal from "../PostulationViewModal/PostulationViewModal";
import {CloseCircle} from "iconsax-react";

export default function ProjectPostulationsModal(params) {
    const postulations = params.postulations
    const [filter, setFilter] = useState("PENDING")

    return (
        <div className="modal-container">
            <div className="form-text">
                Projectos Postulados
            </div>
            <div className="search-header-buttons">
                <button className={filter === "PENDING" ? "button-members-left-selected" : "button-members-left"}
                        onClick={() => {
                            setFilter("PENDING")
                        }}>
                    Pendientes
                </button>
                <button className={filter === "PENDING" ? "button-members-right" : "button-members-right-selected"}
                        onClick={() => {
                            setFilter("REJECTED")
                        }}>
                    Rechazadas
                </button>
            </div>
            <div className="scrollDivProjects">
                {postulations.map((data) => {
                    return <PostulationViewModal key={data.ppid} data={data} filter={filter} />
                })}
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )

}
