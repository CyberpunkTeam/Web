import {CloseCircle} from "iconsax-react";
import {useState} from "react";
import {requestFinishProject} from "../../services/notificationService";

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
        <div className={"abandonModalWithoutOptions"}>
            <div className="form-text-modal">
                Are you sure you want to submit the completion request for this project?
            </div>
            <div className="container-button-modal">
                <button className="cancel-edit-button-style" onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        onClick={finish}
                        className={buttonDisabled ?  "save-edit-button-style-disabled" : "save-edit-button-style"}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Submit"}
                </button>
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )
}
