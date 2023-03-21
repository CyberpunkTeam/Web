import {CloseCircle} from "iconsax-react";
import {useContext, useState} from "react";
import {deleteVacant} from "../../services/teamService";
import {isMobile} from "react-device-detect";
import AppContext from "../../utils/AppContext";

export function DeleteVacantModal(params) {
    let context = useContext(AppContext);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const errorMessageRequest = "An error has occurred while deleting this opportunity. Please, try again later"
    const deletePosition = () => {
        setButtonDisabled(true);
        deleteVacant(params.data.tpid, {state: "CLOSED"}).then((r) => {
            if (r === undefined) {
                if (context.errorMessage !== errorMessageRequest) {
                    context.setErrorMessage(errorMessageRequest);
                }
            } else {
                params.closeModal()
            }
            setButtonDisabled(false);
        })
    }

    return (
        <div className={isMobile ? "abandonModalWithoutOptionsMobile" : "abandonModalWithoutOptions"}>
            <div className={isMobile ? "form-text-modal-mobile" : "form-text-modal"}>
                Are you sure you want to delete this vacant?
            </div>
            <div className={isMobile ? "container-button-modal-mobile" : "container-button-modal"}>
                <button className={isMobile ? "cancel-edit-button-style-modal-mobile" : "cancel-edit-button-style"}
                        onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        onClick={deletePosition}
                        className={buttonDisabled ? isMobile ? "save-edit-button-style-disabled-red-mobile" : "save-edit-button-style-disabled-red" : isMobile ? "save-edit-button-style-red-mobile" : "save-edit-button-style-red"}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Delete"}
                </button>
            </div>
            {isMobile ? null :
                <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>}
        </div>
    )
}
