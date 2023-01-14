import {AddCircle, Star1} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import Modal from "react-modal";
import TeamModal from "../TeamModal";
import {Link} from "react-router-dom";
import {isMobile} from "react-device-detect";
import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";

export default function UserTeamsComponent(params) {
    let context = useContext(AppContext);
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
                    {data.technologies.map((data) => {
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
                    <Star1 size={isMobile ? "40" : "16"} color="#ECA95A" variant="Bold" className={"icon"}/>
                    5.0
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

        return (
            <div className={isMobile ? "teamContainerMobile" : "teamContainer"}>
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
                <AddCircle color="#FAFAFA" variant="Bold" size={40} className="icon"/>
                Crear Equipo
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

const modalStyle = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        fontFamily: "Inter",
        padding: '0',
        borderWidth: 0,
        borderRadius: '10px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: "0px 4px 10px #666666",
    },
}
