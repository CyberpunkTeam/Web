import {AddCircle, Star1} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {isMobile} from "react-device-detect";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import FrameworkTag from "../FrameworkTag";
import PlatformTag from "../PlatformTag";
import CloudTag from "../CloudTag";

export default function UserTeamsComponent(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    if (Object.keys(params.userData).length === 0) {
        return;
    }
    const create = () => {
        navigate("/team/new")
    }

    const teamTags = (data) => {
        return (
            <div className={isMobile || context.size ? "teamTagsMobile" : "teamTags"}>
                {data.technologies.programming_language.map((data) => {
                    return <TechnologyTag key={data} technology={data}/>
                })}
                {data.technologies.frameworks.map((data) => {
                    return <FrameworkTag key={data} framework={data}/>
                })}
                {data.technologies.platforms.map((data) => {
                    return <PlatformTag key={data} platform={data}/>
                })}
                {data.technologies.databases.map((data) => {
                    return <CloudTag key={data} cloud={data}/>
                })}
                {data.project_preferences.map((data) => {
                    return <PreferenceTag key={data} preference={data}/>
                })}
                {data.idioms.map((data) => {
                    return <PreferenceTag key={data} preference={data}/>
                })}
                {data.methodologies.map((data) => {
                    return <PreferenceTag key={data} preference={data}/>
                })}
            </div>
        )
    }

    const teamView = (data) => {

        const team_link = "/team/" + data.tid;

        return (
            <div key={data.tid}
                 className={isMobile ? "teamDataInfoMobile" : context.size ? "teamDataInfoReduce" : "teamDataInfo"}>
                <Link to={team_link} className={isMobile ? "teamLinkNameMobile" : "teamLinkName"}>
                    {data.name}
                </Link>
                <div className={isMobile ? "rank-mobile" : "rank"}>
                    <Star1 size={isMobile ? "40" : "16"} color="#ECA95A" variant="Linear" className={"star"}/>
                    {data.overall_rating.toFixed(1)}
                </div>
            </div>
        )
    }

    const team = (data) => {
        const goTo = () => {
            navigate("/team/" + data.tid)
        }

        return (
            <div key={data.tid} className={isMobile ? "teamContainerMobile" : "teamContainer"} onClick={goTo}>
                <div className={isMobile || context.size ? "teamInfoMobile" : "teamInfo"}>
                    {teamView(data)}
                    {teamTags(data)}
                </div>
            </div>
        )
    }

    const addButton = () => {
        if (params.userData.user.uid !== context.user.uid) {
            return
        }

        if (isMobile) {
            return (
                <button className="createTeamButtonMobile" onClick={create}>
                    <AddCircle color="#FAFAFA" variant="Bold" size={48}/>
                </button>
            )
        }

        return (
            <button className="createTeamButton" onClick={create}>
                <AddCircle color="#FAFAFA" variant="Bold" size={32} className="icon"/>
                New Team
            </button>
        )
    }

    return (
        <div className={"user-team-container"}>
            {addButton()}
            {params.userData.teams.map((data) => {
                if (data.temporal) {
                    return null
                }
                return team(data)
            })}
        </div>
    )
}
