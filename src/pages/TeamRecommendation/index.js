import './style.css'
import {isMobile} from "react-device-detect";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import {useLocation, useNavigate} from "react-router-dom";
import TeamRecommendationTile from "../../components/TeamRecommendationTile";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import TemporalTeam from "../../components/TemporalTeam";

export default function TeamRecommendation() {
    let context = useContext(AppContext);
    const {state} = useLocation();
    const navigate = useNavigate();
    const [teamSelected, setTeamSelected] = useState(undefined)
    const goToProject = () => {
        navigate("/projects/" + state.project)
    }

    const temporalTeams = () => {
        if (state.temporal === undefined || state.temporal.length === 0) {
            return
        }

        return (
            <>
                <div className={isMobile ? "create-projects-header-mobile" : "create-projects-header"}>
                    {state.temporal.length === 1 ? "Temporal team selected" : "Temporal Teams"}
                </div>
                {state.temporal.length === 1 ?
                    <TeamRecommendationTile key={state.temporal[0].tid} data={state.temporal[0]}
                                            project={state.project}/> : state.temporal.map((team) => {
                        return <TemporalTeam key={team.name} data={team} project={state.project} setTeamSelected={setTeamSelected} teamSelected={teamSelected}/>
                    })}
            </>
        )
    }

    return (
        <div className={isMobile ? "projects-screen-mobile" : "projects-screen"}>
            {temporalTeams()}
            <div className={isMobile ? "create-projects-header-mobile" : "create-projects-header"}>
                Team Recommendations
            </div>
            {state.teams.map((team) => {
                return <TeamRecommendationTile key={team.tid} data={team} project={state.project}/>
            })}
            <div
                className={isMobile ? "new-vacant-button-mobile" : context.size ? "new-vacant-button-reduced" : "new-vacant-button"}>
                <button className={isMobile ? "cancel-edit-button-style-mobile" : "cancel-edit-button-style"}
                        onClick={goToProject}>
                    {state.again === undefined ? "Finish" : "Go Back"}
                </button>
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    );
}
