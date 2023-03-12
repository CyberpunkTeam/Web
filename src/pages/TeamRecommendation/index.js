import './style.css'
import {isMobile} from "react-device-detect";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import {useLocation, useNavigate} from "react-router-dom";
import TeamRecommendationTile from "../../components/TeamRecommendationTile";

export default function TeamRecommendation() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const goToProject = () => {
        navigate("/projects/" + state.project)
    }


    return (
        <div className={isMobile ? "profile-screen-mobile" : "projects-screen"}>
            <div className="create-projects-header">
                Team Recommendations
            </div>
            {state.teams.map((team) => {
                return <TeamRecommendationTile key={team.tid} data={team} project={state.project}/>
            })}
            <div className="create-project-buttons">
                <button className={"create-project-from-button"} onClick={goToProject}>
                    {state.again === undefined ? "Finish" :  "Go Back"}
                </button>
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    );
}
