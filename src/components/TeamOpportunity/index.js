import {isMobile} from "react-device-detect";
import {UserCirlceAdd} from "iconsax-react";
import {useContext, useState} from "react";
import {modalStyle} from "../../styles/commonStyles";
import {PostulateInTeamModal} from "../PostulateInTeamModal";
import Modal from "react-modal";
import TechnologyTag from "../TechnologyTag";
import FrameworkTag from "../FrameworkTag";
import PlatformTag from "../PlatformTag";
import CloudTag from "../CloudTag";
import DataBaseTag from "../DataBaseTag";
import AppContext from "../../utils/AppContext";

export default function TeamOpportunity(params) {
    let context = useContext(AppContext);
    const [showMore, setShowMore] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);

    const seeMore = () => {
        setShowMore(!showMore)
    }

    const openModalPostulations = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
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

    const postulationButton = () => {
        if (params.data.team.members.includes(context.user.uid)) {
            return;
        }

        return (
            <button className={isMobile ? "postulateVacantButtonMobile" : "postulateVacantButton"}
                    disabled={params.data.candidates.includes(context.user.uid)}
                    onClick={openModalPostulations}>
                <UserCirlceAdd color="#FAFAFA" variant="Bold" size={isMobile ? 48 : 24} className="icon"/>
                {params.data.candidates.includes(context.user.uid) ? "Postulation sent" : "Postulate"}
            </button>
        )
    }

    return (
        <div key={params.data.tpid} className="vacantPostulationContainer">
            <div className={isMobile ? "vacantDataMobile" : context.size ? "vacantDataReduce" : "vacantData"}>
                <div className={isMobile || context.size ? "vacantInfoContainerReduced" : "vacantInfoContainer"}>
                    <div className={isMobile ? "vacantTitleMobile" : "vacantTitle"}>
                        {params.data.team.name} - {params.data.title}
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
                {postulationButton()}
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                <PostulateInTeamModal data={params.data} closeModal={closeModal}/>
            </Modal>
        </div>
    )
}
