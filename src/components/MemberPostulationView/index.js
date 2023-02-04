import './style.css'
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {isMobile} from "react-device-detect";
import {ArrowCircleLeft, ArrowCircleRight, CloseCircle, TickCircle, Trash, User, UserCirlceAdd} from "iconsax-react";
import {acceptCandidate, deleteVacant, rejectCandidate, teamPostulate} from "../../services/teamService";

export default function MemberPostulationView(params) {
    let context = useContext(AppContext);
    const [showMore, setShowMore] = useState(false);
    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const seeMore = () => {
        setShowMore(!showMore)
    }

    const postulate = () => {
        teamPostulate(params.data.tpid, context.user.uid).then((r) => {
        })
    }

    const deletePosition = () => {
        deleteVacant(params.data.tpid, {state: "CLOSED"}).then((r) => {
        })
    }


    if (params.owner !== context.user.uid) {
        let list = []
        params.data.candidates.map((user) => {
            list.push(user.uid)
            return null
        })

        if (list.includes(context.user.uid)) {
            return
        }

        return (
            <div key={params.data.tpid} className="vacantPostulationContainer">
                <div className={isMobile || context.size ? "vacantDataMobile" : "vacantData"}>
                    <div className={isMobile || context.size ? "vacantInfoContainerReduced" : "vacantInfoContainer"}>
                        <div className="vacantPostulationsTitle">
                            {params.data.title}
                        </div>
                        <div className="vacantDescription">
                            Description
                            <div className="vacantPostulationDescription">
                                {showMore ? params.data.description.substring(0, params.data.description.length) : params.data.description.substring(0, 600)}
                                {showMore || params.data.description.length < 600 ? "" : "..."}
                            </div>
                            <div className={"seeMore"} onClick={seeMore}>
                                {params.data.description.length < 600 ? null : !showMore ?
                                    "Show More" : "Show Less"}
                            </div>
                        </div>
                    </div>
                    <button className="postulateVacantButton" onClick={postulate}>
                        <UserCirlceAdd color="#FAFAFA" variant="Bold" size={24} className="icon"/>
                        Postulate
                    </button>
                </div>
            </div>
        )
    }
    const rejectButton = () => {
        const reject = () => {
            setLoading(true)
            rejectCandidate(params.data.tpid, params.data.candidates[index].uid).then(() => {
                let candidates = [...params.data.candidates]
                candidates.splice(index, 1);
                setIndex(0)
                params.data.candidates =  candidates
                setLoading(false)
            })
        }

        if (loading) {
            return (
                <div className="loading-button-reject">
                    <i className="fa fa-circle-o-notch fa-spin"></i>
                </div>
            )
        } else {
            return (
                <CloseCircle className={"button"} size="48px" color="#CD5B45" variant="Bold" onClick={reject}/>
            )
        }
    }
    const acceptButton = () => {

        const accept = () => {
            setLoading(true)
            acceptCandidate(params.data.tid, params.data.tpid, params.data.candidates[index].uid).then(() => {
                window.location.reload()
            })
            setLoading(false)
        }
        if (loading) {
            return (
                <div className="loading-button">
                    <i className="fa fa-circle-o-notch fa-spin"></i>
                </div>
            )
        } else {
            return (
                <TickCircle size="48" className={"button"} color="#014751" variant="Bold" onClick={accept}/>
            )
        }
    }

    const userImage = (data) => {
        if (data.profile_image === "default") {
            return (
                <div className="applicationsUserImage">
                    <User color="#FAFAFA" size="30" variant="Bold"/>
                </div>
            )
        } else {
            return <img src={data.profile_image} alt='' className="applicationsUserImage"/>
        }
    }

    const applications = () => {
        if (params.data.candidates.length === 0) {
            return (
                <div className={"withoutApplications"}>
                    No Applications
                </div>
            )
        }

        const back = () => {
            if (index !== 0) {
                setIndex(index - 1)
            }
        }

        const next = () => {
            if (params.data.candidates.length - 1 !== index) {
                setIndex(index + 1)
            }
        }

        return (
            <div className="applications">
                <ArrowCircleLeft
                    size="24"
                    className={"button"}
                    onClick={back}
                    color={index !== 0 ? "#AAAAAA" : "#F1F1F1"}
                />
                <div className={"applicationsInformation"}>
                    <div className={"applicationsUserInformation"}>
                        {userImage(params.data.candidates[index])}
                        {params.data.candidates[index].name} {params.data.candidates[index].lastname}
                    </div>
                    <div className="postulations-buttons-container">
                        {rejectButton()}
                        {acceptButton()}
                    </div>
                </div>
                <ArrowCircleRight
                    size="24"
                    className={"button"}
                    onClick={next}
                    color={params.data.candidates.length - 1 !== index ? "#AAAAAA" : "#F1F1F1"}
                />
            </div>
        )
    }

    return (
        <div key={params.data.tpid} className="teamPostulationContainer">
            <div className={context.size ? "teamPostulationInfoReduce" : "teamPostulationInfo"}>
                <div className={context.size ? "vacantInfoReduce" : "vacantInfo"}>
                    <div className="vacantTitle">
                        {params.data.title}
                    </div>
                    <div>
                        Description
                        <div className="descriptionApplication">
                            {showMore ? params.data.description.substring(0, params.data.description.length) : params.data.description.substring(0, 600)}
                            {showMore || params.data.description.length < 600 ? "" : "..."}
                        </div>
                        <div className={"seeMoreApplication"} onClick={seeMore}>
                            {params.data.description.length < 600 ? null : !showMore ?
                                "Show More" : "Show Less"}
                        </div>
                    </div>
                    <button className="deleteVacantButton" onClick={deletePosition}>
                        <Trash color="#FAFAFA" variant="Bold" size={24}/>
                    </button>
                </div>
                <div className={context.size ? "vacantDescriptionContainerReduced" : "vacantDescriptionContainer"}>
                    {applications()}
                </div>
            </div>
        </div>
    )
}
