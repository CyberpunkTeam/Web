import './style.css'
import {isMobile} from "react-device-detect";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";

export default function TeamRecommendation() {
    return (
        <div className={isMobile ? "profile-screen-mobile" : "projects-screen"}>
            <div className="create-projects-header">
                Team Recommendations
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    );
}
