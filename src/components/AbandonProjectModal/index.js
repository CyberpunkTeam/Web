import './style.css'
import {ArrowDown2, CloseCircle} from "iconsax-react";
import {useContext, useState} from "react";
import {abandonProject, abandonProjectRequest} from "../../services/notificationService";
import AppContext from "../../utils/AppContext";
import {isMobile} from "react-device-detect";

export function AbandonProjectModal(params) {
    let context = useContext(AppContext);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const condition = params.project.creator.uid !== context.user.uid;
    const [reason, setReason] = useState(condition ? "The owner did not carry out the payments" : "I don't want to do this project")

    const setReasonHandler = (event) => {
        setReason(event.target.value);
    }

    const abandon = () => {
        setButtonDisabled(true)
        const body = {
            "pid": params.project.pid,
            "tid": params.project.team_assigned.tid,
            "reasons": [reason]
        }

        if (condition) {
            abandonProject(body).then((r) => {
                setButtonDisabled(false)
                params.closeModal()
                window.location.reload()
            })
        } else {
            abandonProjectRequest(body).then((r) => {
                setButtonDisabled(false);
                params.closeModal();
            })
        }
    }

    const options = () => {
        if (condition) {
            return (
                <>
                    <option value="The owner did not carry put with payments">
                        The owner did not carry out the payments
                    </option>
                    <option value="Disagreements with the owner">
                        Disagreements with the owner
                    </option>
                    <option value="The owner never answered our messages">
                        The owner never answered our messages
                    </option>
                    <option value="The owner discontinued project">
                        The owner discontinued project
                    </option>
                </>
            )
        }

        return (
            <>
                <option value="I don't want to do this project">
                    I don't want to do this project
                </option>
                <option value="Disagreements with the team">
                    Disagreements with the team
                </option>
                <option value="The team never answered my messages">
                    The team never answered my messages
                </option>
            </>
        )
    }

    return (
        <div className={isMobile ? "abandonModalMobile" : "abandonModal"}>
            <div className={isMobile ? "form-text-modal-mobile" : "form-text-modal"}>
                {condition ? "Are you sure \n you want to leave this project?" : "Are you sure you want the team to leave this project?"}
            </div>
            <form className={isMobile ? "modal-form-modal" : "modal-form"}>
                <label className={isMobile ? "modal-label-options" : "create-project-label"}>
                    {condition ?
                        "What is the reason you want to leave?" : "What is the reason?"}
                    <div className="create-project-input">
                        <select value={reason} className={isMobile ? "selectMobile" : "select"} onChange={setReasonHandler}>
                            {options()}
                        </select>
                        <ArrowDown2 className={isMobile ? "from-button-mobile" : "from-button"} color="#B1B1B1" variant="Outline" size={isMobile ? 40 : 20}/>
                    </div>
                </label>
            </form>
            <div className={isMobile ? "container-button-modal-mobile" : "container-button-modal"}>
                <button className={isMobile ? "cancel-edit-button-style-modal-mobile" : "cancel-edit-button-style"} onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        onClick={abandon}
                        className={buttonDisabled ? isMobile ? "save-edit-button-style-disabled-mobile" : "save-edit-button-style-disabled" : isMobile ? "save-edit-button-style-mobile" : "save-edit-button-style"}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : condition ? "Leave" : "Send"}
                </button>
            </div>
            {isMobile ? null : <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>}
        </div>
    )
}
