import {AddCircle, Briefcase} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import Modal from "react-modal";
import AddExperienceModal from "../AddExperienceModal";
import {isMobile} from "react-device-detect";

export default function WorkExperienceComponent(params) {
    let context = useContext(AppContext);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [length, setLength] = useState(1);

    if (Object.keys(params.userData).length === 0) {
        return;
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const less = () => {
        setLength(1)
    }

    const more = () => {
        setLength(params.userData.user.work_experience.length)
    }

    const viewMore = () => {
        if (params.userData.user.work_experience.length <= 1) {
            return (<div className={isMobile ? "view-more-mobile" : "view-more"}/>)
        }

        if (length === 1) {
            return (
                <div className={isMobile ? "view-more-mobile" : "view-more"} onClick={more}>
                    {`See More (+${params.userData.user.work_experience.length - 1})`}
                </div>
            )
        }

        return (
            <div className={isMobile ? "view-more-mobile" : "view-more"} onClick={less}>
                See Less
            </div>
        )

    }

    const experienceView = (data) => {
        return (
            <div key={data.position} className={isMobile ? "data-info-mobile" : "data-info"}>
                {data.position}
                <div className={isMobile ? "education-info-mobile" : "education-info"}>
                    {data.company}
                    <div>
                        {data.start_date.split('-')[0]} - {data.current_job ? data.finish_date.split('-')[0] : "Actual"}
                    </div>
                </div>
            </div>
        )
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                <AddExperienceModal closeModal={closeModal}/>
            </Modal>
        )
    }

    if (params.userData.user.work_experience.length === 0) {
        if (params.userData.user.uid !== context.user.uid) {
            return
        }

        if (isMobile) {
            return (
                <div className="user-info-container-mobile">
                    <div className="user-info-mobile">
                        <div className="data-title-mobile">
                            <Briefcase size="56" color="#014751" className={"icon"}/>
                            Add Job Experience
                        </div>
                        <div className="button-center">
                            <AddCircle size="80" color="#B1B1B1" onClick={openModal}/>
                        </div>
                    </div>
                    {modal()}
                </div>
            )
        }

        return (
            <div className={context.size ? "experience-empty-container-reduce" : "experience-empty-container"}>
                <div className={context.size ? "experience-empty-info-container-reduce" : "experience-empty-info-container"}>
                    <div className={context.size ? "experience-empty-title-reduce" : "experience-empty-title"}>
                        <Briefcase size="32px" color="#014751" className={context.size ? "icon-reduce" : "icon"}/>
                        Add Job Experience
                    </div>
                    <AddCircle size="28px" color="#B1B1B1" onClick={openModal} className={"icon-button"}/>

                </div>
                {modal()}
            </div>
        )
    }

    if (isMobile) {
        return (
            <div className={length === 1 ? "user-info-container-mobile-condensed" : "user-info-container-mobile"}>
                <div className="user-info-mobile">
                    <div className="experience-title-mobile">
                        <Briefcase size="56" color="#014751" className={"icon"}/>
                        Job Experiences
                    </div>
                    {params.userData.user.work_experience.slice(0, length).map((data) => {
                        return experienceView(data)
                    })}
                    {viewMore()}
                </div>
                {modal()}
            </div>
        )
    }

    return (
        <div className={ context.size ? length === 1 ? "user-info-container-reduce" : "user-info-container-reduce-full" : "user-info-container" }>
            {params.userData.user.uid !== context.user.uid ? null :
                <AddCircle size="24" color="#B1B1B1" className="add-button" onClick={openModal}/>}
            <div className="user-info">
                <div className="data-title">
                    <Briefcase size="32" color="#014751" className={"icon"}/>
                    Job Experiences
                </div>
                {params.userData.user.work_experience.slice(0, length).map((data) => {
                    return experienceView(data)
                })}
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
        borderRadius: '16px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: "0px 4px 10px #666666",
    },
}
