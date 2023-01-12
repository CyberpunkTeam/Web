import {AddCircle, People, Star1} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import Modal from "react-modal";
import TeamModal from "../TeamModal";
import TeamsModal from "../TeamsModal";
import {Link} from "react-router-dom";
import {isMobile} from "react-device-detect";

export default function UserTeamsComponent(params) {
    let context = useContext(AppContext);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [viewAll, setViewAll] = useState(false);

    if (Object.keys(params.userData).length === 0) {
        return;
    }

    const closeModal = () => {
        setViewAll(false);
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const openViewAll = () => {
        setViewAll(true)
        setIsOpen(true)
    }
    const viewMore = () => {
        return (
            <div className={isMobile ? "view-more-mobile" : "view-more"} onClick={openViewAll}>
                {params.userData.teams.length > 1 ? `Ver más (+${params.userData.teams.length - 1})` : ""}
            </div>
        )
    }

    const teamView = () => {
        if (params.userData.teams.length === 0) {
            return;
        }

        const team_link = "/team/" + params.userData.teams[0].tid;

        return (
            <div className={isMobile ? "data-info-mobile" : "data-info"}>
                <Link to={team_link} className={isMobile ? "team-link-mobile" : "team-link"}>
                    {params.userData.teams[0].name}
                </Link>
                <div className={isMobile ? "rank-mobile" : "rank"}>
                    <Star1 size={isMobile ? "40" : "16"} color="#2E9999" variant="Bold" className={"icon"}/>
                    5.0
                </div>
            </div>
        )
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                {viewAll ? <TeamsModal teams={params.userData.teams} closeModal={closeModal}/> :
                    <TeamModal closeModal={closeModal}/>}
            </Modal>
        )
    }


    return (
        <div className={isMobile ? "team-info-container-mobile" : "user-info-container"}>
            {params.userData.user.uid !== context.user.uid ? null : isMobile ? null :
                <AddCircle size="24" color="#B1B1B1" className="add-button" onClick={openModal}/>}
            <div className={isMobile ? "user-info-mobile" : "user-info"}>
                <div className={isMobile ? "data-title-mobile" : "data-title"}>
                    <People size={isMobile ? "48" : "32"} color="#014751" className={"icon"}/>
                    Equipos
                </div>
                {teamView()}
                {viewMore()}
            </div>
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
