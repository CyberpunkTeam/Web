import './style.css'
import {isMobile} from "react-device-detect";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import {useContext, useEffect, useState} from "react";
import Loading from "../../components/loading";
import {getAllTeamPositions} from "../../services/teamService";
import AppContext from "../../utils/AppContext";
import TeamOpportunity from "../../components/TeamOpportunity";
import logo from "../../assests/projects-pana.svg";

export default function JobsScreen() {
    let context = useContext(AppContext);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getAllTeamPositions().then((r) => {
            console.log(r)
            setJobs(r)
            setLoading(false)
        })
    }, []);

    if (loading) {
        return <Loading/>
    }

    const cover = () => {
        return (
            <div className="opportunity-header">
                <div className="projects-cover">
                    <img src={logo} className="pana-projects-style" alt="logo"/>
                    <div className={"projects-cover-title"}>
                        Find the team of your dreams to work on the best projects
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
                        Find the team of your dreams to work on the best projects
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
            <div className={"recommendations-container"}>
                recommendations
            </div>
            <div>
                {jobs.map((data) => {
                    return <TeamOpportunity key={data.tid} data={data}/>
                })}
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    );
}
