import './style.css'
import {useState} from "react";
import TeamPostulationView from "../TeamPostulationView";

export default function TeamProjectPostulations(params) {
    const postulations = params.postulations
    const [filter, setFilter] = useState("PENDING")

    const filters = () => {
        return (
            <div className="filterButtonsContainer">
                <div className="filtersButtons">
                    <button className={filter === "PENDING" ? "button-members-selected" : "button-members"}
                            onClick={() => {
                                setFilter("PENDING")
                            }}>
                        Pendientes
                    </button>
                    <button className={filter === "PENDING" ? "button-members" : "button-members-selected"}
                            onClick={() => {
                                setFilter("REJECTED")
                            }}>
                        Rechazadas
                    </button>
                </div>
            </div>
        )
    }

    if (postulations.length === 0) {
        return;
    }

    return (
        <div className="postulations-container">
            {filters()}
            {postulations.map((data) => {
                return <TeamPostulationView key={data.ppid} data={data} filter={filter}/>
            })}
        </div>
    )
}
