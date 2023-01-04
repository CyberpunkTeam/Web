import './style.css'

import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {updateUser} from "../../services/userService";

export default function AddEducationModal(params) {
    let context = useContext(AppContext);

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [title, setTitle] = useState( "");
    const [institution, setInstitution] = useState( "");
    const [startDate, setStartDate] = useState( "");
    const [finishDate, setFinishDate] = useState( "");

    const setTitleHandler = (event) => {
        setTitle(event.target.value);
    }

    const setInstitutionHandler = (event) => {
        setInstitution(event.target.value);
    }

    const setStartDateHandler = (event) => {
        setStartDate(event.target.value);
    }

    const setFinishDateHandler = (event) => {
        setFinishDate(event.target.value);
    }


    const createEducationButton = () => {
        setButtonDisabled(true)
        let educations = [...context.user.education]
        const newEducation =
            {
                "title": title,
                "institution": institution,
                "start_date": startDate,
                "finish_date": finishDate,
                "finished": finishDate !== ""
            }

        educations.push(newEducation)

        const body = {
            education: educations
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
            Agregar  Títulos y Certificaciones
        </div>
        <form className="modal-form">
            <div className="label">
                <label>
                    Titulo
                    <div className="modal-form-input">
                        <input type="text" value={title} className="input" onChange={setTitleHandler}/>
                    </div>
                </label>
            </div>
            <div className="label">
                <label>
                    Institución
                    <div className="modal-form-input">
                        <input type="text" value={institution} className="input" onChange={setInstitutionHandler}/>
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
                {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : "Agregar"}
            </button>
        </div>
    </div>)
}
