import './style.css'
import {useState} from "react";
import TeamPostulationView from "../TeamPostulationView";
import {isMobile} from "react-device-detect";

export default function TeamProjectPostulations(params) {
    const postulations = params.postulations
    const [filter, setFilter] = useState("PENDING")

    const showData = () => {
        let count = 0;
        postulations.forEach((value) => {
            if (value.state === filter) {
                count++;
            }
        })
      return count
    }

    const noData = () => {
        if (showData() === 0) {
            return (
                <div className={"no-data-tag"}>
                    No postulations available
                </div>
            )
        }
    }

    if (params.loadingPostulations) {
        return (
            <div className={"loading-tag"}>
                <i className="fa fa-circle-o-notch fa-spin"/>)
            </div>
        )
    }

    const filters = () => {
        return (
            <div className={isMobile ? "filterButtonsContainerMobile" : "filterButtonsContainer"}>
                <div className="filtersButtons">
                    <button className={filter === "PENDING" ? isMobile ? "button-members-selected-mobile" : "button-members-selected" : isMobile ? "button-members-mobile" : "button-members"}
                            onClick={() => {
                                setFilter("PENDING")
                            }}>
                        Pending
                    </button>
                    <button className={filter === "REJECTED" ? isMobile ? "button-members-selected-mobile" : "button-members-selected" : isMobile ? "button-members-mobile" : "button-members"}
                            onClick={() => {
                                setFilter("REJECTED")
                            }}>
                        Rejected
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
            {noData()}
            {postulations.map((data) => {
                return <TeamPostulationView key={data.ppid} data={data} filter={filter}/>
            })}
        </div>
    )
}
