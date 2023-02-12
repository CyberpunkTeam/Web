import {AddCircle, Award} from "iconsax-react";
import {isMobile} from "react-device-detect";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import Modal from "react-modal";
import {modalStyle} from "../../styles/commonStyles";
import AddSkillModal from "../AddSkillModal";
import TechnologyTag from "../TechnologyTag";
import FrameworkTag from "../FrameworkTag";
import PlatformTag from "../PlatformTag";
import CloudTag from "../CloudTag";
import DataBaseTag from "../DataBaseTag";
import PreferenceTag from "../PreferenceTag";

export default function UserSkills(params) {
    let context = useContext(AppContext);
    const [modalIsOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }
    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                {<AddSkillModal closeModal={closeModal}/>}
            </Modal>
        )
    }

    if (params.userData.user.skills.programming_language.length === 0 && params.userData.user.skills.frameworks.length === 0 &&
        params.userData.user.skills.platforms.length === 0 && params.userData.user.skills.cloud_providers.length === 0 &&
        params.userData.user.skills.databases.length === 0 && params.userData.user.skills.methodologies.length === 0) {

        if (params.userData.user.uid !== context.user.uid || isMobile) {
            return
        }

        return (
            <div className={context.size ? "experience-empty-container-reduce" : "experience-empty-container"}>
                <div className={context.size ? "experience-empty-info-container-reduce" : "experience-empty-info-container"}>
                    <div className={"experience-empty-title"}>
                        <Award size="32" color="#014751" className={"icon"}/>
                        Add Skills
                    </div>
                    <AddCircle size="28" color="#B1B1B1" onClick={openModal} className={"icon-button"}/>
                </div>
                {modal()}
            </div>
        )
    }

    const skills = () => {
        return (
            <div className={"user-skills-tags"}>
                <div className="tags-projects">
                    {params.userData.user.skills.programming_language.map((technology) => {
                        return <TechnologyTag key={params.userData.user.uid + technology} technology={technology}/>
                    })}
                </div>
                <div className="tags-projects">
                    {params.userData.user.skills.frameworks.map((framework) => {
                        return <FrameworkTag key={params.userData.user.uid + framework} framework={framework}/>
                    })}
                </div>
                <div className="tags-projects">
                    {params.userData.user.skills.platforms.map((data) => {
                        return <PlatformTag key={params.userData.user.uid + data} platform={data}/>
                    })}
                </div>
                <div className="tags-projects">
                    {params.userData.user.skills.cloud_providers.map((cloud) => {
                        return <CloudTag key={params.userData.user.uid + cloud} cloud={cloud}/>
                    })}
                </div>
                <div className="tags-projects">
                    {params.userData.user.skills.databases.map((database) => {
                        return <DataBaseTag key={params.userData.user.uid + database} database={database}/>
                    })}
                </div>
                <div className="tags-projects">
                    {params.userData.user.skills.methodologies.map((preference) => {
                        return <PreferenceTag key={params.userData.user.uid + preference} preference={preference}/>
                    })}
                </div>
            </div>
        )
    }

    if (isMobile) {
        return (
            <div className={"user-info-container-mobile"}>
                <div className="user-info-mobile">
                    <div className="data-title-mobile">
                        <Award size="56" color="#014751" className="icon"/>
                        Skills
                    </div>
                    {skills()}
                </div>
            </div>
        )
    }

    return (
        <div
            className={context.size ? "user-info-container-reduce-full" : "user-info-container"}>
            {params.userData.user.uid !== context.user.uid ? null :
                <AddCircle size="24" color="#B1B1B1" className="add-button" onClick={openModal}/>}
            <div className={isMobile ? "user-info-mobile" : "user-info"}>
                <div className={isMobile ? "data-title-mobile" : "data-title"}>
                    <Award size={isMobile ? "80" : "32"} color="#014751" className="icon"/>
                    Skills
                </div>
                {skills()}
            </div>
            {modal()}
        </div>
    )
}
