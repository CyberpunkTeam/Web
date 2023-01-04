import './style.css'
import {ArrowDown2, CloseCircle, User} from "iconsax-react";
import {useState} from "react";
import {sendTeamPostulation} from "../../services/notificationService";

export default function PostulationModal(params) {
    const [teamName, setTeamName] = useState(params.teams[0].name)
    const [teamIndex, setTeamIndex] = useState(0)
    const [description, setDescription] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [estimatedBudget, setEstimatedBudget] = useState("0")
    const [coin, setCoin] = useState("DOLAR")

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
        setEstimatedBudget(event.target.value);
    }
    const setDescriptionHandler = (event) => {
        setDescription(event.target.value);
    }

    const showTeamMembers = (data) => {
        if (data.profile_image === "default") {
            return (
                <div  key={data.uid} className="member-photo-postulation">
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
        setButtonDisabled(true)
        const body = {
            tid: params.teams[teamIndex].tid,
            pid: params.pid,
            estimated_budget: parseInt(estimatedBudget),
            currency: "DOLAR",
            proposal_description: description
        }
        sendTeamPostulation(body).then(() => {
            setButtonDisabled(false)
            params.closeModal()
        })
    }

    return (
        <div className="modal-container">
            <div className="form-text">
                Postulación
            </div>
            <form className="modal-form">
                <label className="label">
                    Elige un equipo
                    <div className="modal-form-input">
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
                <label className="label">
                    Presupuesto
                    <div className="budget-input-container">
                        <input type="number" value={estimatedBudget} className="budget-input"
                               onChange={setEstimatedBudgetHandler}/>
                        <select value={coin} className="select-coin" onChange={setCoinHandler}>
                            <option value="DOLAR">USD</option>
                        </select>
                    </div>
                </label>
                <div className="text-area-postulation-label">
                    Descripción
                    <textarea className="description" value={description} onChange={setDescriptionHandler} name="Text1"
                              cols="40"
                              rows="5"/>
                </div>
            </form>
            <div className="container-button-modal">
                <button className="cancel-edit-button-style" onClick={params.closeModal}>
                    Cancelar
                </button>
                <button disabled={buttonDisabled}
                        className={buttonDisabled ? "save-edit-button-style-disabled" : "save-edit-button-style"}
                        onClick={sendTeamPostulationButton}
                >
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Enviar"}
                </button>
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )

}
