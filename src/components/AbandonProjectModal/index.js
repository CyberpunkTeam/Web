import './style.css'
import {ArrowDown2, CloseCircle} from "iconsax-react";
import {useContext, useState} from "react";
import {abandonProject, abandonProjectRequest} from "../../services/notificationService";
import AppContext from "../../utils/AppContext";

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
        <div className={"abandonModal"}>
            <div className="form-text">
                {condition ? "Are you sure you want to leave this project?" : "Are you sure you want the team to leave this project?"}
            </div>
            <form className="modal-form">
                <label className="create-project-label">
                    {condition ?
                        "What is the reason you want to leave?" : "What is the reason?"}
                    <div className="create-project-input">
                        <select value={reason} className="select" onChange={setReasonHandler}>
                            {options()}
                        </select>
                        <ArrowDown2 className="from-button" color="#B1B1B1" variant="Outline" size={20}/>
                    </div>
                </label>
            </form>
            <div className="container-button-modal">
                <button className="cancel-edit-button-style" onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        onClick={abandon}
                        className={buttonDisabled ? condition ? "leave-project-button-style-disabled" : "save-edit-button-style-disabled" : condition ? "leave-project-button-style" : "save-edit-button-style"}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : condition ? "Leave" : "Send"}
                </button>
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )
}
