import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import {createTeam} from "../../services/teamService";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {useNavigate} from "react-router-dom";

export default function CreateTeamModal() {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState("");
    const [tech, setTech] = useState("");
    const [techs, setTechs] = useState([]);
    const [prefs, setPrefs] = useState([]);
    const [pref, setPref] = useState("");

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
        const body = {
            name: teamName,
            technologies: techs,
            project_preferences: prefs,
            owner: context.user.uid
        }

        createTeam(body).then((response) => {
            navigate("/team/" + response.tid)
        })

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
            <button className="modal-button-style" onClick={() => {
                createTeamButton()
            }}>
                Listo
            </button>
        </div>
    </div>)
}
