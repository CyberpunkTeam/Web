import './style.css'
import {AddCircle, Teacher} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import Modal from "react-modal";
import AddEducationModal from "../AddEducationModal";
import {isMobile} from "react-device-detect";
import {modalStyle} from "../../styles/commonStyles";

export default function EducationComponent(params) {

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
        setLength(params.userData.user.education.length)
    }


    const viewMore = () => {
        if (params.userData.user.education.length <= 1) {
            return (<div className={isMobile ? "view-more-mobile" : "view-more"}/>)
        }

        if (length === 1) {
            return (
                <div className={isMobile ? "view-more-mobile" : "view-more"} onClick={more}>
                    {`Show More (+${params.userData.user.education.length - 1})`}
                </div>
            )
        }

        return (
            <div className={isMobile ? "view-more-mobile" : "view-more"} onClick={less}>
                Show Less
            </div>
        )

    }

    const experienceView = (data) => {
        if (params.userData.user.education.length === 0) {
            return;
        }

        return (
            <div key={data.title} className={isMobile ? "data-info-mobile" : "data-info"}>
                {data.title}
                <div className={isMobile ? "education-info-mobile" : "education-info"}>
                    {data.institution}
                    <div>
                        {data.start_date.split('-')[0]} - {data.finished ? data.finish_date.split('-')[0] : "Actual"}
                    </div>
                </div>
            </div>
        )
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                {<AddEducationModal closeModal={closeModal}/>}
            </Modal>
        )
    }

    if (params.userData.user.education.length === 0) {
        if (params.userData.user.uid !== context.user.uid || isMobile) {
            return
        }

        /*if (isMobile) {
            return (
                <div className="user-info-container-mobile">
                    <div className="user-info-mobile">
                        <div className="data-title-mobile">
                            <Teacher size="56" color="#014751" className={"icon"}/>
                            Add Degree or Certification
                        </div>
                        <div className="button-center">
                            <AddCircle size="80" color="#B1B1B1" onClick={openModal}/>
                        </div>
                    </div>
                    {modal()}
                </div>
            )
        }*/

        return (
            <div className={context.size ? "experience-empty-container-reduce" : "experience-empty-container"}>
                <div className={context.size ? "experience-empty-info-container-reduce" : "experience-empty-info-container"}>
                    <div className={"experience-empty-title"}>
                        <Teacher size="32px" color="#014751" className={"icon"}/>
                        Add Degree or Certification
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
                    <div className="data-title-mobile">
                        <Teacher size="56" color="#014751" className="icon"/>
                        Degree and Certification
                    </div>
                    {params.userData.user.education.slice(0, length).map((data) => {
                        return experienceView(data)
                    })}
                    {viewMore()}
                </div>
                {modal()}
            </div>
        )
    }

    return (
        <div
            className={context.size ? length === 1 ? "user-info-container-reduce" : "user-info-container-reduce-full" : "user-info-container"}>
            {params.userData.user.uid !== context.user.uid ? null :
                <AddCircle size="24" color="#B1B1B1" className="add-button" onClick={openModal}/>}
            <div className={isMobile ? "user-info-mobile" : "user-info"}>
                <div className={isMobile ? "data-title-mobile" : "data-title"}>
                    <Teacher size={isMobile ? "80" : "32"} color="#014751" className="icon"/>
                    Degree and Certification
                </div>
                {params.userData.user.education.slice(0, length).map((data) => {
                    return experienceView(data)
                })}
                {viewMore()}
            </div>
            {modal()}
        </div>
    )
}
