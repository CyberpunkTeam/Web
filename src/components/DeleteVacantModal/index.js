import {CloseCircle} from "iconsax-react";
import {useState} from "react";
import {deleteVacant} from "../../services/teamService";
import {isMobile} from "react-device-detect";

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
        <div className={isMobile ? "abandonModalWithoutOptionsMobile" : "abandonModalWithoutOptions"}>
            <div className={isMobile ? "form-text-modal-mobile" : "form-text-modal"}>
                Are you sure you want to delete this vacant?
            </div>
            <div className={isMobile ? "container-button-modal-mobile" : "container-button-modal"}>
                <button className={isMobile ? "cancel-edit-button-style-modal-mobile" : "cancel-edit-button-style"} onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        onClick={deletePosition}
                        className={buttonDisabled ? isMobile ? "save-edit-button-style-disabled-red-mobile" : "save-edit-button-style-disabled-red" : isMobile ? "save-edit-button-style-red-mobile" : "save-edit-button-style-red"}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Delete"}
                </button>
            </div>
            {isMobile ? null : <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>}
        </div>
    )
}
