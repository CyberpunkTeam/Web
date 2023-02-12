import {isMobile} from "react-device-detect";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import NewMemberVacant from "../../components/NewMemberVacant";
import {useLocation} from "react-router-dom";

export default function CreateVacantScreen(params) {
    const {state} = useLocation();
    return (
        <div className={isMobile ? "profile-screen-mobile" : "team-screen"}>
            <NewMemberVacant tid={state.tid}/>
            <SearchBar/>
            <SideBar/>
        </div>
    )
}
