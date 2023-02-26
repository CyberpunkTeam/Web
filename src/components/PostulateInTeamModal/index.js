import {CloseCircle} from "iconsax-react";
import {useContext, useState} from "react";
import {teamPostulate} from "../../services/teamService";
import AppContext from "../../utils/AppContext";
import {isMobile} from "react-device-detect";

export function PostulateInTeamModal(params) {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    let context = useContext(AppContext);

    const postulate = () => {
        setButtonDisabled(true)
        teamPostulate(params.data.tpid, context.user.uid).then((r) => {
            setButtonDisabled(false)
            params.closeModal()
        })
    }

    return (
        <div className={isMobile ? "abandonModalWithoutOptionsMobile" : "abandonModalWithoutOptions"}>
            <div className="form-text-modal">
                Are you sure you want to apply for this team's position?
            </div>
            <div className="container-button-modal">
                <button className="cancel-edit-button-style" onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        onClick={postulate}
                        className={buttonDisabled ?  "save-edit-button-style-disabled" : "save-edit-button-style"}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Apply"}
                </button>
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )
}
