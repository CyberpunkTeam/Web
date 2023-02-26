import {CloseCircle} from "iconsax-react";
import {useContext, useState} from "react";
import {teamPostulate} from "../../services/teamService";
import AppContext from "../../utils/AppContext";
import {isMobile} from "react-device-detect";

export function PostulateInTeamModal(params) {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    let context = useContext(AppContext);

    const postulate = () => {
        setButtonDisabled(true)
        teamPostulate(params.data.tpid, context.user.uid).then((r) => {
            setButtonDisabled(false)
            params.closeModal()
        })
    }


    return (
        <div className={isMobile ? "abandonModalWithoutOptionsMobile" : "abandonModalWithoutOptions"}>
            <div className={isMobile ? "form-text-modal-mobile" : "form-text-modal"}>
                Are you sure you want to apply for this team's position?
            </div>
            <div className={isMobile ? "container-button-modal-mobile" : "container-button-modal"}>
                <button className={isMobile ? "cancel-edit-button-style-modal-mobile" : "cancel-edit-button-style"} onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        onClick={postulate}
                        className={buttonDisabled ? isMobile ? "save-edit-button-style-disabled-mobile" : "save-edit-button-style-disabled" : isMobile ? "save-edit-button-style-mobile" : "save-edit-button-style"}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Apply"}
                </button>
            </div>
            {isMobile ? null : <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>}
        </div>
    )
}
