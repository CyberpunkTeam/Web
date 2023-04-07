import './style.css'
import {isMobile} from "react-device-detect";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import {useLocation, useNavigate} from "react-router-dom";
import TeamRecommendationTile from "../../components/TeamRecommendationTile";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";

export default function TeamRecommendation() {
    let context = useContext(AppContext);
    const {state} = useLocation();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    console.log(state)
    const navigate = useNavigate();
    const goToProject = () => {
        navigate("/projects/" + state.project)
    }


    return (
        <div className={isMobile ? "projects-screen-mobile" : "projects-screen"}>
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
                    {state.again === undefined ? "Finish" :  "Go Back"}
                </button>
                <button disabled={buttonDisabled}
                        className={buttonDisabled ? isMobile ? "button-style-disabled-mobile" : "save-edit-button-style-disabled" : isMobile ? "button-style-mobile" : "save-edit-button-style"}
                        >
                    Create temporal team
                </button>
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    );
}
