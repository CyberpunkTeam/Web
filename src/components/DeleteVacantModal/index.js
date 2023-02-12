import {CloseCircle} from "iconsax-react";
import {useState} from "react";
import {deleteVacant} from "../../services/teamService";

export function DeleteVacantModal(params) {
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const deletePosition = () => {
        setButtonDisabled(true);
        deleteVacant(params.data.tpid, {state: "CLOSED"}).then((r) => {
            setButtonDisabled(false);
            params.closeModal()
        })
    }

    return (
        <div className={"abandonModalWithoutOptions"}>
            <div className="form-text-modal">
                Are you sure you want to delete this vacant?
            </div>
            <div className="container-button-modal">
                <button className="cancel-edit-button-style" onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        onClick={deletePosition}
                        className={buttonDisabled ?  "save-edit-button-style-disabled-red" : "save-edit-button-style-red"}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Delete"}
                </button>
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )
}
