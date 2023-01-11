import './style.css'
import {useState} from "react";
import PostulationViewModal from "../PostulationViewModal/PostulationViewModal";
import {CloseCircle} from "iconsax-react";

export default function TeamProjectPostulations(params) {
    const postulations = params.postulations
    const [filter, setFilter] = useState("PENDING")

    const filters = () => {
        return (
            <div className="filterButtonsContainer">
                <div className="filtersButtons">
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
            </div>
        )
    }

    return (
        <div className="postulations-container">
            {filters()}
            <div className="scrollDivProjects">
                {postulations.map((data) => {
                    return <PostulationViewModal key={data.ppid} data={data} filter={filter}/>
                })}
            </div>
        </div>
    )
}
