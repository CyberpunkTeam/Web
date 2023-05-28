import {ArrowDown2, CloseCircle} from "iconsax-react";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {isMobile} from "react-device-detect";
import {sendUserRecommendation} from "../../services/notificationService";

export function RecommendUserModal(params) {
    let context = useContext(AppContext);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [team, setTeam] = useState(params.teams[0].name)
    const errorMessage = "An error has occurred while recommending the user. Please, try again later"

    const setReasonHandler = (event) => {
        setTeam(event.target.value);
    }

    const abandon = () => {
        setButtonDisabled(true)
        let teamData = params.teams[0];
        for (let i = 0; i < params.teams.length; i++) {
            if (params.teams[i].name === team) {
                teamData = params.teams[i]
                break;
            }
        }

        const body = {
            "sender_id": context.user.uid,
            "receiver_id": teamData.owner,
            "tid": teamData.tid,
            "uid_recommendation": params.uid
        }

        sendUserRecommendation(body, context).then((response) => {
            if (response === undefined) {
                if (context.errorMessage !== errorMessage) {
                    context.setErrorMessage(errorMessage);
                }
            } else {
                params.closeModal()
            }
            setButtonDisabled(false)
        })
    }


    return (
        <div className={isMobile ? "abandonModalMobile" : "abandonModal"}>
            <div className={isMobile ? "form-text-modal-mobile" : "form-text-modal"}>
                Which team do you want to recommend this user to?
            </div>
            <form className={isMobile ? "modal-form-modal" : "modal-form"}>
                <label className={isMobile ? "modal-label-options" : "create-project-label"}>
                    Select a team
                    <div className="create-project-input">
                        <select value={team} className={isMobile ? "selectMobile" : "select"}
                                onChange={setReasonHandler}>
                            {params.teams.map((team) => {
                                return (
                                    <option key={team.name} value={team.name}>
                                        {team.name}
                                    </option>
                                )
                            })}
                        </select>
                        <ArrowDown2 className={isMobile ? "from-button-mobile" : "from-button"} color="#B1B1B1"
                                    variant="Outline" size={isMobile ? 40 : 20}/>
                    </div>
                </label>
            </form>
            <div className={isMobile ? "container-button-modal-mobile" : "container-button-modal"}>
                <button className={isMobile ? "cancel-edit-button-style-modal-mobile" : "cancel-edit-button-style"}
                        onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        onClick={abandon}
                        className={buttonDisabled ? isMobile ? "save-edit-button-style-disabled-mobile" : "save-edit-button-style-disabled" : isMobile ? "save-edit-button-style-mobile" : "save-edit-button-style"}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Recommend"}
                </button>
            </div>
            {isMobile ? null :
                <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>}
        </div>
    )
}
