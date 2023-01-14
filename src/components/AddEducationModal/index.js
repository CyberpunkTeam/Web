import './style.css'

import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {updateUser} from "../../services/userService";
import {CloseCircle} from "iconsax-react";

export default function AddEducationModal(params) {
    let context = useContext(AppContext);

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [title, setTitle] = useState("");
    const [institution, setInstitution] = useState("");
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");

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

    return (
        <div className={context.size ? "modal-container-reduce" : "modal-container"}>
            <div className="form-text">
                Agregar Títulos y Certificaciones
            </div>
            <form className="modal-form">
                <div className="label">
                    <label>
                        Titulo
                        <input type="text" value={title} className="input" onChange={setTitleHandler}/>
                    </label>
                </div>
                <div className="label">
                    <label>
                        Institución
                        <input type="text" value={institution} className="input" onChange={setInstitutionHandler}/>
                    </label>
                </div>
                <div className="label-double">
                    <div className="label-double-column">
                        <label>
                            Inicio
                            <input type="date" value={startDate} placeholder="dd-mm-yyyy" min="1900-01-01"
                                   max="2030-12-31" className="input-double" onChange={setStartDateHandler}/>
                        </label>
                    </div>
                    <div className="label-double-column">
                        <label>
                            Fin
                            <input type="date" value={finishDate} placeholder="dd-mm-yyyy" min="1900-01-01"
                                   max="2030-12-31" className="input-double" onChange={setFinishDateHandler}/>
                        </label>
                    </div>
                </div>
            </form>
            <div className="container-button-modal">
                <button className="cancel-edit-button-style" onClick={params.closeModal}>
                    Cancelar
                </button>
                <button disabled={buttonDisabled}
                        className={buttonDisabled ? "save-edit-button-style-disabled" : "save-edit-button-style"}
                        onClick={createEducationButton}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : "Agregar"}
                </button>
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )
}
