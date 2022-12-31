import './style.css'

import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {updateUser} from "../../services/userService";

export default function AddExperienceModal(params) {
    let context = useContext(AppContext);

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [position, setPosition] = useState( "");
    const [company, setCompany] = useState( "");
    const [startDate, setStartDate] = useState( "");
    const [finishDate, setFinishDate] = useState( "");

    const setPositionHandler = (event) => {
        setPosition(event.target.value);
    }

    const setCompanyHandler = (event) => {
        setCompany(event.target.value);
    }

    const setStartDateHandler = (event) => {
        setStartDate(event.target.value);
    }

    const setFinishDateHandler = (event) => {
        setFinishDate(event.target.value);
    }


    const createEducationButton = () => {
        setButtonDisabled(true)
        let workExperience = [...context.user.work_experience]
        const newWorkExperience =
            {
                "position": position,
                "company": company,
                "start_date": startDate,
                "finish_date": finishDate,
                "current_job": finishDate !== ""
            }

        workExperience.push(newWorkExperience)

        const body = {
            work_experience: workExperience
        }

        updateUser(context.user.uid, body).then((response) => {
            context.setUser(response);
            localStorage.setItem("user", JSON.stringify(response))
            setButtonDisabled(false)
            params.closeModal()
        })
    }

    return (<div className="modal-container">
        <div className="form-text">
            Agregar experiencia
        </div>
        <form className="modal-form">
            <div className="label">
                <label>
                    Posición
                    <div className="modal-form-input">
                        <input type="text" value={position} className="input" onChange={setPositionHandler}/>
                    </div>
                </label>
            </div>
            <div className="label">
                <label>
                    Compania
                    <div className="modal-form-input">
                        <input type="text" value={company} className="input" onChange={setCompanyHandler}/>
                    </div>
                </label>
            </div>
            <div className="label-double">
                <label>
                    Inicio
                    <div className="modal-form-input">
                        <input type="date" value={startDate} placeholder="dd-mm-yyyy" min="1990-01-01" max="2030-12-31" className="input" onChange={setStartDateHandler}/>
                    </div>
                </label>
                <label>
                    Fin
                    <div className="modal-form-input">
                        <input type="date" value={finishDate} placeholder="dd-mm-yyyy" min="1990-01-01" max="2030-12-31" className="input" onChange={setFinishDateHandler}/>
                    </div>
                </label>
            </div>
        </form>
        <div className="container-button-modal">
            <button className="cancel-edit-button-style" onClick={params.closeModal}>
                Cancelar
            </button>
            <button disabled={buttonDisabled} className={buttonDisabled ? "save-edit-button-style-disabled" : "save-edit-button-style"} onClick={createEducationButton}>
                {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : "Guardar"}
            </button>
        </div>
    </div>)
}
