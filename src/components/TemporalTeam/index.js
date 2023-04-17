import './style.css'
import {isMobile} from "react-device-detect";
import TechnologyTag from "../TechnologyTag";
import FrameworkTag from "../FrameworkTag";
import PlatformTag from "../PlatformTag";
import CloudTag from "../CloudTag";
import {People, TickCircle, User} from "iconsax-react";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {createTeamTemporal} from "../../services/teamService";

export default function TemporalTeam(params) {
    let context = useContext(AppContext);
    const data = params.data
    const [loading, setLoading] = useState(false);
    const [sendIt, setSendIt] = useState(data.sent_notification);
    const sendInvitation = () => {
        setLoading(true);
        if (sendIt) {
            return
        }

        const body = {
            name: data.name,
            members: data.members,
            skills: data.skills,
            pid: params.project
        }
        createTeamTemporal(body).then(
            () => {
                setSendIt(true);
                params.setTeamSelected(data.name)
                setLoading(false);
            }
        )
    }

    const teamTags = (data) => {
        return (
            <div className={isMobile || context.size ? "teamTagsMobile" : "teamTags"}>
                <div className="teamTagContainer">
                    {data.skills.programming_language.map((data) => {
                        return <TechnologyTag key={data} technology={data}/>
                    })}
                </div>
                <div className="teamTagContainer">
                    {data.skills.frameworks.map((data) => {
                        return <FrameworkTag key={data} framework={data}/>
                    })}
                </div>
                <div className="teamTagContainer">
                    {data.skills.platforms.map((data) => {
                        return <PlatformTag key={data} platform={data}/>
                    })}
                </div>
                <div className="teamTagContainer">
                    {data.skills.databases.map((data) => {
                        return <CloudTag key={data} cloud={data}/>
                    })}
                </div>
            </div>
        )
    }

    const inviteButtonMobile = () => {
        if (!isMobile) {
            return
        }

        return (
            <div className={"teamInfoMobileButton"}>
                <button disabled={sendIt || loading} className={"createProjectButtonCoverMobile"}
                        onClick={sendInvitation}>
                    {loading ? <i className="fa fa-circle-o-notch fa-spin"/> :
                        sendIt ?
                            <TickCircle color="#FAFAFA" variant="Bold" size={isMobile ? 48 : 24} className="icon"/> :
                            <People color="#FAFAFA" variant="Bold" size={isMobile ? 48 : 24} className="icon"/>}
                    {loading ? "" : sendIt ? "Sent" : "Send Invitation"}
                </button>
            </div>
        )
    }

    const teamView = (data) => {
        const inviteButton = () => {
            if (isMobile) {
                return
            }
            if (params.teamSelected !== undefined && params.teamSelected !== data.name) {
                return
            }

            return (
                <button disabled={sendIt || loading} className={"postulateVacantButton"} onClick={sendInvitation}>
                    {loading ? <i className="fa fa-circle-o-notch fa-spin"/> :
                        sendIt ?
                            <TickCircle color="#FAFAFA" variant="Bold" size={isMobile ? 48 : 24} className="icon"/> :
                            <People color="#FAFAFA" variant="Bold" size={isMobile ? 48 : 24} className="icon"/>}
                    {loading ? "" : sendIt ? "Sent" : "Send Invitation"}
                </button>
            )
        }

        return (
            <div key={data.tid}
                 className={isMobile ? "teamDataInfoMobile" : "teamDataRecommendationInfo"}>
                <div className={"teamRecommendationTitle"}>
                    <div className={isMobile ? "teamLinkNameMobile" : "teamLinkName"}>
                        {data.name}
                    </div>
                </div>
                {inviteButton()}
            </div>
        )
    }

    const member = (data) => {
        const user_image = (data) => {
            if (data.profile_image === "default") {
                return (
                    <div className={isMobile ? "member-photo-mobile" : "member-photo"}>
                        <User color="#FAFAFA" size={isMobile ? "32" : "16"} variant="Bold"/>
                    </div>
                )
            } else {
                return <img src={data.profile_image} alt=''
                            className={isMobile ? "user-mobile-image" : "user-sidebar"}/>
            }
        }

        if (isMobile) {
            return (
                <div key={data.uid} className="members-info-container-mobile-recommendation">
                    <div className="members-info-mobile">
                        {user_image(data)}
                        <div className="member-name-mobile">
                            {data.name} {data.lastname}
                        </div>
                    </div>
                </div>
            )
        }


        return (
            <div key={data.uid} className="members-info-container-recommendation">
                <div className="members-info">
                    {user_image(data)}
                    <div className="member-name">
                        {data.name} {data.lastname}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div key={data.tid} className={isMobile ? "teamContainerMobileTemporal" : "teamContainerTemporal"}>
            <div className={isMobile || context.size ? "teamInfoMobile" : "teamInfoRecommendation"}>
                {teamView(data)}
                {teamTags(data)}
                <div className="members-container-recommendation">
                    {data.members.map((data) => {
                            return member(data)
                        }
                    )}
                </div>
                {inviteButtonMobile()}
            </div>
        </div>
    )

}
