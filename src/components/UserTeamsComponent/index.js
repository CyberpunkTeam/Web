import {AddCircle, Star1} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import Modal from "react-modal";
import TeamModal from "../TeamModal";
import {Link, useNavigate} from "react-router-dom";
import {isMobile} from "react-device-detect";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import {modalStyle} from "../../styles/commonStyles";

export default function UserTeamsComponent(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const [modalIsOpen, setIsOpen] = useState(false);

    if (Object.keys(params.userData).length === 0) {
        return;
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const teamTags = (data) => {

        return (
            <div className={isMobile || context.size ? "teamTagsMobile" : "teamTags"}>
                <div className="teamTagContainer">
                    {data.technologies.programming_language.map((data) => {
                        return <TechnologyTag key={data} technology={data}/>
                    })}
                </div>
                <div className="teamTagContainer">
                    {data.project_preferences.map((data) => {
                        return <PreferenceTag key={data} preference={data}/>
                    })}
                </div>
            </div>
        )
    }
    const teamView = (data) => {

        const team_link = "/team/" + data.tid;

        return (
            <div key={data.tid} className={isMobile ? "teamDataInfoMobile" : context.size ? "teamDataInfoReduce" : "teamDataInfo"}>
                <Link to={team_link} className="teamLinkName">
                    {data.name}
                </Link>
                <div className={isMobile ? "rank-mobile" : "rank"}>
                    <Star1 size={isMobile ? "40" : "16"} color="#ECA95A" variant="Linear" className={"star"}/>
                    {data.overall_rating.toFixed(1)}
                </div>
            </div>
        )
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                <TeamModal closeModal={closeModal}/>
            </Modal>
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
        if (params.userData.user.uid !== context.user.uid){
            return
        }

        if (isMobile) {
            return (
                <button className="createTeamButtonMobile" onClick={openModal}>
                    <AddCircle color="#FAFAFA" variant="Bold" size={48}/>
                </button>
            )
        }

        return (
            <button className="createTeamButton" onClick={openModal}>
                <AddCircle color="#FAFAFA" variant="Bold" size={32} className="icon"/>
                New Team
            </button>
        )
    }

    return (
        <div className={"user-team-container"}>
            {addButton()}
            {params.userData.teams.map((data) => {
                return team(data)
            })}
            {modal()}
        </div>
    )
}
