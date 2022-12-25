import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import {createTeam, updateTeam} from "../../services/teamService";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {useNavigate} from "react-router-dom";

export default function TeamModal(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [teamName, setTeamName] = useState(params.team !== undefined ? params.team.name : "");
    const [tech, setTech] = useState("");
    const [pref, setPref] = useState("");
    const [techs, setTechs] = useState(params.team !== undefined ? [...params.team.technologies] : []);
    const [prefs, setPrefs] = useState(params.team !== undefined ? [...params.team.project_preferences] : []);

    const setTeamHandler = (event) => {
        setTeamName(event.target.value);
    }

    const setPrefHandler = (event) => {
        setPref(event.target.value);
    }

    const setTechHandler = (event) => {
        setTech(event.target.value);
    }

    const addTechTag = (event) => {
        if (event.key === "Enter") {
            let actualTech = techs;
            actualTech.push(tech)
            setTechs(actualTech)
            setTech("")
        }
    }

    const addPrefsTag = (event) => {
        if (event.key === "Enter") {
            let actualPrefs = prefs;
            actualPrefs.push(pref)
            setPrefs(actualPrefs)
            setPref("")
        }
    }

    const createTeamButton = () => {
        setButtonDisabled(true)
        const body = {
            name: teamName,
            technologies: techs,
            project_preferences: prefs,
            owner: context.user.uid
        }

        createTeam(body).then((response) => {
            setButtonDisabled(false)
            navigate("/team/" + response.tid)
        })

    }

    const updateTeamButton = () => {
        setButtonDisabled(true)
        const body = {
            name: teamName,
            technologies: techs,
            project_preferences: prefs
        }

        updateTeam(params.team.tid, body).then((response) => {
            setTeamName(response.name);
            setTechs([...response.technologies]);
            setPrefs([...response.project_preferences]);
            response["members"] = params.team.members;
            params.setTeamData(response)
            setButtonDisabled(false)
            params.closeModal()
        })
    }

    const buttons = () => {
        if (params.team !== undefined) {
            return(
                <>
                    <button className="cancel-edit-button-style" onClick={params.closeModal}>
                        Cancelar
                    </button>
                    <button disabled={buttonDisabled} className={buttonDisabled ? "save-edit-button-style-disabled" : "save-edit-button-style"} onClick={updateTeamButton}>
                        {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        Guardar
                    </button>
                </>
            )
        }
        return (
            <button disabled={buttonDisabled} className={buttonDisabled ? "modal-button-style-disabled" : "modal-button-style"} onClick={createTeamButton}>
                {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                Listo
            </button>
        )
    }

    return (<div className="modal-container">
        <div className="form-text">
            Crea un nuevo equipo
        </div>
        <form className="modal-form">
            <div className="label">
                <label>
                    Nombre
                    <div className="modal-form-input">
                        <input type="text" value={teamName} className="input" onChange={setTeamHandler}/>
                    </div>
                </label>
                <label>
                    Tecnologías
                    <div className="modal-form-input-with-tags">
                        <input type="text" value={tech} className="input" onChange={setTechHandler}
                               onKeyUp={addTechTag}/>
                        <div className="modal-tags-container">
                            {techs.map((value) => {
                                return <TechnologyTag technology={value}/>
                            })}
                        </div>
                    </div>
                </label>
                <label>
                    Preferencias de Proyecto
                    <div className="modal-form-input-with-tags">
                        <input type="text" value={pref} className="input" onChange={setPrefHandler}
                               onKeyUp={addPrefsTag}/>
                        <div className="modal-tags-container">
                            {prefs.map((value) => {
                                return <PreferenceTag preference={value}/>
                            })}
                        </div>
                    </div>
                </label>
            </div>
        </form>
        <div className="container-button-modal">
            {buttons()}
        </div>
    </div>)
}
