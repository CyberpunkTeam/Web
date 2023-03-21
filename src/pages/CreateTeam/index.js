import TeamModal from "../../components/TeamModal";
import {useLocation} from "react-router-dom";
import {isMobile} from "react-device-detect";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import AlertMessage from "../../components/AlertMessage";

export default function CreateTeam() {
    const {state} = useLocation();

    return (
        <div className={isMobile ? "profile-screen-mobile" : "team-screen"}>
            <TeamModal team={state !== null ? state.team : undefined}/>
            <SearchBar/>
            <SideBar/>
            <AlertMessage/>
        </div>
    )
}
