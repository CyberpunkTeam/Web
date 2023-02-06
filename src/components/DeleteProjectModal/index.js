import {CloseCircle} from "iconsax-react";
import {useState} from "react";
import {updateProject} from "../../services/projectService";

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
        <div className={"abandonModal"}>
            <div className="form-text">
                Are you sure you want to delete this project?
            </div>
            <div className="container-button-modal">
                <button className="cancel-edit-button-style" onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        onClick={deleteProjectButton}
                        className={buttonDisabled ?  "save-edit-button-style-disabled-red" : "save-edit-button-style-red"}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Delete"}
                </button>
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )
}
