import {CloseCircle} from "iconsax-react";
import {useState} from "react";
import {requestFinishProject} from "../../services/notificationService";
import {isMobile} from "react-device-detect";

export function CompleteProjectModal(params) {
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const finish = () => {
        setButtonDisabled(true)
        const body = {
            "pid": params.project.pid,
            "tid": params.project.team_assigned.tid
        }

        requestFinishProject(body).then((r) => {
            setButtonDisabled(false);
            params.closeModal()
        })
    }

    return (
        <div className={isMobile ? "abandonModalWithoutOptionsMobile" : "abandonModalWithoutOptions"}>
            <div className={isMobile ? "form-text-modal-mobile" : "form-text-modal"}>
                Are you sure you want to submit the completion request for this project?
            </div>
            <div className={isMobile ? "container-button-modal-mobile" : "container-button-modal"}>
                <button className={isMobile ? "cancel-edit-button-style-modal-mobile" : "cancel-edit-button-style"} onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        onClick={finish}
                        className={buttonDisabled ? isMobile ? "save-edit-button-style-disabled-mobile" : "save-edit-button-style-disabled" : isMobile ? "save-edit-button-style-mobile" : "save-edit-button-style"}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Submit"}
                </button>
            </div>
        </div>
    )
}
