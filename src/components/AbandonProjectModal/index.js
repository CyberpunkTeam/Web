import './style.css'
import {ArrowDown2, CloseCircle} from "iconsax-react";
import {useState} from "react";
import {abandonProject} from "../../services/notificationService";

export function AbandonProjectModal(params) {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [reason, setReason] = useState("Alemán")

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

        console.log(body)

        abandonProject(body).then((r) => {
            console.log(r)
            setButtonDisabled(false)
        })
    }

    return (
        <div className={"abandonModal"}>
            <div className="form-text">
                Are you sure you want to leave the project?
            </div>
            <form className="modal-form">
                <label className="create-project-label">
                    What is the reason you want to leave?
                    <div className="create-project-input">
                        <select value={reason} className="select" onChange={setReasonHandler}>
                            <option value="The owner did not carry put with payments">The owner did not carry out the payments</option>
                            <option value="Disagreements with the owner">Disagreements with the owner</option>
                            <option value="The owner never answered our messages">The owner never answered our messages</option>
                            <option value="The owner discontinued project">The owner discontinued project</option>
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
                        className={buttonDisabled ? "leave-project-button-style-disabled" : "leave-project-button-style"}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Leave"}
                </button>
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )
}
