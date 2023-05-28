import './style.css'
import {ArrowDown2, CloseCircle, User} from "iconsax-react";
import {useContext, useState} from "react";
import {sendTeamPostulation} from "../../services/notificationService";
import AppContext from "../../utils/AppContext";

export default function PostulationModal(params) {
    let context = useContext(AppContext);
    const [teamName, setTeamName] = useState(params.teams[0].name)
    const [teamIndex, setTeamIndex] = useState(0)
    const [description, setDescription] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [estimatedBudget, setEstimatedBudget] = useState(params.budget)
    const [coin, setCoin] = useState("DOLAR")
    const errorMessage = "An error has occurred while sending the postulation. Please, try again later"
    const errorMessageCompleteData = "Please complete the required fields"

    const [errorBudget, setErrorBudget] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
    const validateFields = () => {
        let error = false;

        if (estimatedBudget === "0" || estimatedBudget === "") {
            error = true;
            setErrorBudget(true)
        }

        if (description === "" || description.length <= 10) {
            error = true;
            setErrorDescription(true)
        }

        return error;
    }

    const setTeamHandler = (event) => {
        params.teams.map((team, index) => {
            if (team.name === event.target.value) {
                setTeamIndex(index)
            }
            return null
        })
        setTeamName(event.target.value);
    }

    const setCoinHandler = (event) => {
        setCoin(event.target.value);
    }

    const setEstimatedBudgetHandler = (event) => {
        if (event.target.value !== "") {
            setErrorBudget(false)
        }
        setEstimatedBudget(event.target.value);
    }
    const setDescriptionHandler = (event) => {
        if (event.target.value.length > 10) {
            setErrorDescription(false)
        }
        setDescription(event.target.value);
    }

    const showTeamMembers = (data) => {
        if (data.profile_image === "default") {
            return (
                <div key={data.uid} className="member-photo-postulation">
                    <div className="photo-postulation">
                        <User color="#FAFAFA" size="24px" variant="Bold"/>
                    </div>
                </div>
            )
        } else {
            return (
                <div key={data.uid} className="member-photo-postulation">
                    <img src={data.profile_image} alt='' className="photo-postulation"/>
                </div>
            )
        }
    }

    const sendTeamPostulationButton = () => {
        if (validateFields()) {
            context.setErrorMessage(errorMessageCompleteData);
            return;
        }

        setButtonDisabled(true)
        const body = {
            tid: params.teams[teamIndex].tid,
            pid: params.pid,
            estimated_budget: parseInt(estimatedBudget),
            currency: "DOLAR",
            proposal_description: description
        }
        sendTeamPostulation(body, context).then((response) => {
            if (response === undefined) {
                if (context.errorMessage !== errorMessage) {
                    context.setErrorMessage(errorMessage);
                }
            } else {
                context.setCreateMessage("Postulation sent successfully")
                params.closeModal()
            }
            setButtonDisabled(false)
        })
    }

    return (
        <div className="modal-container">
            <div className="form-text-modal">
                Postulation
            </div>
            <form className="modal-form">
                <label className="label">
                    Select a Team
                    <div className="modal-form-input-team">
                        <select value={teamName} className="select-team" onChange={setTeamHandler}>
                            {params.teams.map((e, index) => {
                                return <option key={index} value={e.name}>{e.name}</option>;
                            })}
                        </select>
                        <ArrowDown2 className="from-button-postulation" color="#B1B1B1" variant="Outline" size={20}/>
                    </div>
                    <div className="members-postulation">
                        {params.teams[teamIndex].members.map((user) => {
                            return showTeamMembers(user)
                        })}
                    </div>
                </label>
                <label className={errorBudget ? "label-error" : "label"}>
                    Budget *
                    <div className="budget-input-container">
                        <input type="number" min="0" value={estimatedBudget}
                               className={errorBudget ? "budget-input-error" : "budget-input"}
                               onChange={setEstimatedBudgetHandler}/>
                        <select value={coin} className={errorBudget ? "select-coin-error" : "select-coin"}
                                onChange={setCoinHandler}>
                            <option value="DOLAR">USD</option>
                        </select>
                    </div>
                </label>
                <div className={errorDescription ? "text-area-postulation-label-error" : "text-area-postulation-label"}>
                    Description *
                    <textarea className={errorDescription ? "textarea-style-modal-error" : "textarea-style-modal"}
                              value={description} onChange={setDescriptionHandler} name="Text1"
                              cols="40"
                              rows="5"/>
                </div>
            </form>
            <div className="container-button-modal">
                <button className="cancel-edit-button-style" onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        className={buttonDisabled ? "save-edit-button-style-disabled" : "save-edit-button-style"}
                        onClick={sendTeamPostulationButton}
                >
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Send"}
                </button>
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )

}
