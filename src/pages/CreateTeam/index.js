import TeamModal from "../../components/TeamModal";
import {useLocation} from "react-router-dom";
import {isMobile} from "react-device-detect";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";

export default function CreateTeam() {
    const {state} = useLocation();

    return (
        <div className={isMobile ? "profile-screen-mobile" : "team-screen"}>
            <TeamModal team={state.team}/>
            <SearchBar/>
            <SideBar/>
        </div>
    )
}
