import './style.css'
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {isMobile} from "react-device-detect";
import {ArrowCircleLeft, ArrowCircleRight, CloseCircle, TickCircle, Trash, User, UserCirlceAdd} from "iconsax-react";
import {acceptCandidate, rejectCandidate} from "../../services/teamService";
import Modal from "react-modal";
import {DeleteVacantModal} from "../DeleteVacantModal";
import {PostulateInTeamModal} from "../PostulateInTeamModal";
import {modalStyle} from "../../styles/commonStyles";
import TechnologyTag from "../TechnologyTag";
import FrameworkTag from "../FrameworkTag";
import PlatformTag from "../PlatformTag";
import DataBaseTag from "../DataBaseTag";
import CloudTag from "../CloudTag";
import {sendUserTeamInvitation} from "../../services/notificationService";

export default function MemberPostulationView(params) {
    let context = useContext(AppContext);
    const [showMore, setShowMore] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [postulate, setPostulate] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(false);
    const [invited, setInvited] = useState([]);
    const [members, setMembers] = useState(params.data.users_recommendation.concat(params.data.candidates))
    const errorMessageRequest = "An error has occurred while rejecting the candidate. Please, try again later"
    const errorMessage = "An error has occurred while accepting the candidate. Please, try again later"
    const errorRecommendedMessage = "An error has occurred while recommended to the candidate. Please, try again later"

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setPostulate(false)
        setIsOpen(true);
    }

    const openModalPostulations = () => {
        setPostulate(true)
        setIsOpen(true);
    }

    const seeMore = () => {
        setShowMore(!showMore)
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                {!postulate ? <DeleteVacantModal data={params.data} closeModal={closeModal}/> :
                    <PostulateInTeamModal data={params.data} closeModal={closeModal}/>}
            </Modal>
        )
    }

    const requirements = () => {
        if (params.data.requirements !== null) {
            return (
                <>
                    <div className="tags-projects">
                        {params.data.requirements.programming_language.map((technology) => {
                            return <TechnologyTag key={params.data.tpid + technology} technology={technology}/>
                        })}
                    </div>
                    <div className="tags-projects">
                        {params.data.requirements.frameworks.map((framework) => {
                            return <FrameworkTag key={params.data.tpid + framework} framework={framework}/>
                        })}
                    </div>
                    <div className="tags-projects">
                        {params.data.requirements.platforms.map((data) => {
                            return <PlatformTag key={params.data.tpid + data} platform={data}/>
                        })}
                    </div>
                    <div className="tags-projects">
                        {params.data.requirements.cloud_providers.map((cloud) => {
                            return <CloudTag key={params.data.tpid + cloud} cloud={cloud}/>
                        })}
                    </div>
                    <div className="tags-projects">
                        {params.data.requirements.databases.map((database) => {
                            return <DataBaseTag key={params.data.tpid + database} database={database}/>
                        })}
                    </div>
                </>
            )
        } else {
            return (
                <div className="tags-project">
                    Without requirements
                </div>
            )
        }
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
                <div className={isMobile ? "vacantDataMobile" : context.size ? "vacantDataReduce" : "vacantData"}>
                    <div className={isMobile || context.size ? "vacantInfoContainerReduced" : "vacantInfoContainer"}>
                        <div className={isMobile ? "vacantTitleMobile" : "vacantTitle"}>
                            {params.data.title}
                        </div>
                        {requirements()}
                        <div className={isMobile ? "vacantDescriptionMobile" : "vacantDescription"}>
                            Description
                            <div className={isMobile ? "descriptionApplicationMobile" : "descriptionApplication"}>
                                {showMore ? params.data.description.substring(0, params.data.description.length) : params.data.description.substring(0, 600)}
                                {showMore || params.data.description.length < 600 ? "" : "..."}
                            </div>
                            <div className={"seeMore"} onClick={seeMore}>
                                {params.data.description.length < 600 ? null : !showMore ?
                                    "Show More" : "Show Less"}
                            </div>
                        </div>
                    </div>
                    <button className={isMobile ? "postulateVacantButtonMobile" : "postulateVacantButton"}
                            onClick={openModalPostulations}>
                        <UserCirlceAdd color="#FAFAFA" variant="Bold" size={isMobile ? 48 : 24} className="icon"/>
                        Postulate
                    </button>
                </div>
                {modal()}
            </div>
        )
    }

    const sendInvitations = () => {
        setButtonDisabled(true)
        const body = {
            tpid: params.data.tpid,
            uid: members[index].uid
        }
        sendUserTeamInvitation(body).then((r) => {
            if (r === undefined) {
                if (context.errorMessage !== errorRecommendedMessage) {
                    context.setErrorMessage(errorRecommendedMessage);
                }
            }
            let invitedList = [...invited]
            invitedList.push(members[index].uid)
            setInvited(invitedList)
            setButtonDisabled(false)
        })
    }

    const rejectButton = () => {
        const reject = () => {
            setLoading(true)
            rejectCandidate(params.data.tpid, members[index].uid).then((r) => {
                if (r === undefined) {
                    if (context.errorMessage !== errorMessageRequest) {
                        context.setErrorMessage(errorMessageRequest);
                    }
                } else {
                    let candidates = [...members]
                    candidates.splice(index, 1);
                    setIndex(0)
                    setMembers(candidates)
                }
                setLoading(false)
            })
        }

        if (loading) {
            return (
                <div className={isMobile ? "loading-button-reject-mobile" : "loading-button-reject"}>
                    <i className="fa fa-circle-o-notch fa-spin"></i>
                </div>
            )
        } else {
            return (
                <CloseCircle className={"button"} size={isMobile ? 120 : 48} color="#CD5B45" variant="Bold"
                             onClick={reject}/>
            )
        }
    }

    const acceptButton = () => {

        const accept = () => {
            setLoading(true)
            acceptCandidate(params.data.tid, params.data.tpid, params.data.candidates[index].uid).then((r) => {
                if (r === undefined) {
                    if (context.errorMessage !== errorMessage) {
                        context.setErrorMessage(errorMessage);
                    }
                } else {
                    window.location.reload()
                }
                setLoading(false)
            })
        }

        if (loading) {
            return (
                <div className={isMobile ? "loading-button-mobile" : "loading-button"}>
                    <i className="fa fa-circle-o-notch fa-spin"></i>
                </div>
            )
        } else {
            return (
                <TickCircle size={isMobile ? 120 : 48} className={"button"} color="#014751" variant="Bold"
                            onClick={accept}/>
            )
        }
    }

    const userImage = (data) => {
        if (data.profile_image === "default") {
            return (
                <div className={isMobile ? "applicationsUserImageMobile" : "applicationsUserImage"}>
                    <User color="#FAFAFA" size="30" variant="Bold"/>
                </div>
            )
        } else {
            return <img src={data.profile_image} alt=''
                        className={isMobile ? "applicationsUserImageMobile" : "applicationsUserImage"}/>
        }
    }

    const applications = () => {
        if (params.data.candidates.length === 0 && params.data.users_recommendation.length === 0) {
            return (
                <div className={isMobile ? "withoutApplicationsMobile" : "withoutApplications"}>
                    No Applications
                </div>
            )
        }

        const recommendersUser = params.data.users_recommendation.length

        const back = () => {
            if (index !== 0) {
                setIndex(index - 1)
            }
        }

        const next = () => {
            if (members.length - 1 !== index) {
                setIndex(index + 1)
            }
        }

        const recommended = () => {
            if (index < recommendersUser) {
                return (
                    <div className={"recommended-container"}>
                        Recommended
                    </div>
                )
            }
        }

        const buttons = () => {
            if (index < recommendersUser) {
                return (
                    <button disabled={invited.includes(members[index].uid) || buttonDisabled}
                            onClick={sendInvitations}
                            className={buttonDisabled ? isMobile ? "button-style-disabled-mobile" :
                                "save-edit-button-style-disabled" : isMobile ?
                                "button-style-mobile" : "save-edit-button-style"}>
                        {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        {buttonDisabled ? "" : invited.includes(members[index].uid) ? "Invitation Sent" : "Send Invitation"}
                    </button>
                )
            } else {
                return (
                    <div
                        className={isMobile ? "postulations-buttons-container-mobile" : "postulations-buttons-container"}>
                        {rejectButton()}
                        {acceptButton()}
                    </div>
                )
            }
        }

        return (
            <div className="applications">
                <ArrowCircleLeft
                    size={isMobile ? "48" : "24"}
                    className={"button"}
                    onClick={back}
                    color={index !== 0 ? "#AAAAAA" : "#F1F1F1"}
                />
                <div className={"applicationsInformation"}>
                    <div className={isMobile ? "applicationsUserInformationMobile" : "applicationsUserInformation"}>
                        {userImage(members[index])}
                        {recommended()}
                        {members[index].name} {members[index].lastname}
                    </div>
                    {buttons()}
                </div>
                <ArrowCircleRight
                    size={isMobile ? "48" : "24"}
                    className={"button"}
                    onClick={next}
                    color={members.length - 1 !== index ? "#AAAAAA" : "#F1F1F1"}
                />
            </div>
        )
    }

    return (
        <div key={params.data.tpid} className="teamPostulationContainer">
            <div
                className={isMobile ? "teamPostulationInfoMobile" : context.size ? "teamPostulationInfoReduce" : "teamPostulationInfo"}>
                <div className={isMobile ? "vacantInfoMobile" : context.size ? "vacantInfoReduce" : "vacantInfo"}>
                    <div className={isMobile ? "vacantTitleMobile" : "vacantTitle"}>
                        {params.data.title}
                    </div>
                    {requirements()}
                    <div className={isMobile ? "vacantDescriptionMobile" : "vacantDescription"}>
                        Description
                        <div className={isMobile ? "descriptionApplicationMobile" : "descriptionApplication"}>
                            {showMore ? params.data.description.substring(0, params.data.description.length) : params.data.description.substring(0, 600)}
                            {showMore || params.data.description.length < 600 ? "" : "..."}
                        </div>
                        <div className={"seeMoreApplication"} onClick={seeMore}>
                            {params.data.description.length < 600 ? null : !showMore ?
                                "Show More" : "Show Less"}
                        </div>
                    </div>
                    <button className={isMobile ? "deleteVacantButtonMobile" : "deleteVacantButton"}
                            onClick={openModal}>
                        <Trash color="#FAFAFA" variant="Bold" size={isMobile ? 48 : 24}/>
                    </button>
                </div>
                <div
                    className={isMobile ? "vacantDescriptionContainerMobile" : context.size ? "vacantDescriptionContainerReduced" : "vacantDescriptionContainer"}>
                    {applications()}
                </div>
            </div>
            {modal()}
        </div>
    )
}
