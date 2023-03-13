import {CloseCircle} from "iconsax-react";
import {useState} from "react";
import {updateProject} from "../../services/projectService";
import {isMobile} from "react-device-detect";

export function DeleteProjectModal(params) {
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const deleteProjectButton = () => {
        setButtonDisabled(true);
        const body = {
            "state": "CANCELLED"
        }
        updateProject(params.project.pid, body).then((r) => {
            window.location.reload()
            setButtonDisabled(false);
        })
    }

    return (
        <div className={isMobile ? "abandonModalWithoutOptionsMobile" : "abandonModalWithoutOptions"}>
            <div className={isMobile ? "form-text-modal-mobile" : "form-text-modal"}>
                Are you sure you want to delete this project?
            </div>
            <div className={isMobile ? "container-button-modal-mobile" : "container-button-modal"}>
                <button className={isMobile ? "cancel-edit-button-style-modal-mobile" : "cancel-edit-button-style"} onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        onClick={deleteProjectButton}
                        className={buttonDisabled ? isMobile ? "save-edit-button-style-disabled-red-mobile" : "save-edit-button-style-disabled-red" : isMobile ? "save-edit-button-style-red-mobile" : "save-edit-button-style-red"}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Delete"}
                </button>
            </div>
            {isMobile ? null : <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>}
        </div>
    )
}
