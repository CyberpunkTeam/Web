import {isMobile} from "react-device-detect";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import AlertMessage from "../../components/AlertMessage";
import {useContext} from "react";
import AppContext from "../../utils/AppContext";
import logo from "../../assests/Collab-pana.svg";

export default function Home() {
    let context = useContext(AppContext);

    const cover = () => {
        return (
            <div className="opportunity-header">
                <div className="projects-cover">
                    <img src={logo} className="pana-jobs-style" alt="logo"/>
                    <div className={"projects-cover-title"}>
                        Discover your dream team to work on the coolest projects ever!
                    </div>
                </div>
            </div>
        )
    }

    const coverMobile = () => {
        return (
            <div className={isMobile ? "projects-header-mobile" : "opportunity-header"}>
                <div className="projects-cover-reduced">
                    <div className={isMobile ? "projects-cover-title-reduced-mobile" : "projects-cover-title-reduced"}>
                        Discover your dream team to work on the coolest projects ever!
                    </div>
                    <img src={logo} className={isMobile ? "pana-projects-style-mobile" : "pana-projects-style-reduced"}
                         alt="logo"/>
                </div>
            </div>
        )
    }

    return (
        <div className={isMobile ? "projects-screen-mobile" : "projects-screen"}>
            {isMobile || context.size ? coverMobile() : cover()}
            <SearchBar/>
            <SideBar/>
            <AlertMessage/>
        </div>
    )

}
