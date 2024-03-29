import {projectInvitation} from "../../services/notificationService";
import {isMobile} from "react-device-detect";
import TechnologyTag from "../TechnologyTag";
import FrameworkTag from "../FrameworkTag";
import PlatformTag from "../PlatformTag";
import CloudTag from "../CloudTag";
import PreferenceTag from "../PreferenceTag";
import {Link} from "react-router-dom";
import {People, Star1, TickCircle} from "iconsax-react";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";

export default function TeamRecommendationTile(params) {
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
            tid: data.tid,
            pid: params.project
        }
        projectInvitation(body, context).then(
            () => {
                setSendIt(true);
                setLoading(false);
            }
        )
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
                {data.idioms === null ? null : data.idioms.map((data) => {
                    return <PreferenceTag key={data} preference={data}/>
                })}
                {data.methodologies === null ? null : data.methodologies.map((data) => {
                    return <PreferenceTag key={data} preference={data}/>
                })}
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

        const team_link = "/team/" + data.tid;

        const inviteButton = () => {
            if (isMobile || data.temporal) {
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
                    <Link to={team_link} className={isMobile ? "teamLinkNameMobile" : "teamLinkName"}>
                        {data.name}
                    </Link>
                    <div className={isMobile ? "rank-mobile" : "rank"}>
                        <Star1 size={isMobile ? "40" : "16"} color="#ECA95A" variant="Linear" className={"star"}/>
                        {data.overall_rating.toFixed(1)}
                    </div>
                </div>
                {inviteButton()}
            </div>
        )
    }

    return (
        <div key={data.tid} className={isMobile ? "teamContainerMobile" : "teamContainerRecommendation"}>
            <div className={isMobile || context.size ? "teamInfoMobile" : "teamInfoRecommendation"}>
                {teamView(data)}
                {teamTags(data)}
                {inviteButtonMobile()}
            </div>
        </div>
    )

}
