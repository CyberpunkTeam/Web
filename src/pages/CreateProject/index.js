import './style.css';
import SideBar from "../../components/SideBar";
import {useLocation, useNavigate} from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import {ArrowDown2} from "iconsax-react";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {createProject, updateProject} from "../../services/projectService";
import TechnologyTag from "../../components/TechnologyTag";

export default function CreateProjectScreen() {
    const {state} = useLocation();
    const navigate = useNavigate();
    let context = useContext(AppContext);

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [name, setName] = useState(state === null ? "" : state.project.name)
    const [description, setDescription] = useState(state === null ? "" : state.project.description)
    const [tech, setTech] = useState("")
    const [language, setLanguage] = useState(state === null ? "" : state.project.idioms[0])
    const [techs, setTechs] = useState(state === null ? [] : [...state.project.technologies]);

    const projectButton = () => {
        setButtonDisabled(true)
        const body = {
            "name": name,
            "idioms": [language],
            "description": description,
            "technologies": techs,
            "creator_uid": context.user.uid
        }
        if (state === null) {
            createProject(body).then((r) => {
                setButtonDisabled(false)
                navigate("/projects/" + r.pid)
            })
        } else {
            updateProject(state.project.pid, body).then((r) => {
                setButtonDisabled(false)
                navigate("/projects/" + r.pid)
            })
        }

    }

    const setNameHandler = (event) => {
        setName(event.target.value);
    }

    const setLanguageHandler = (event) => {
        setLanguage(event.target.value);
    }

    const setTechHandler = (event) => {
        setTech(event.target.value);
    }

    const setDescriptionHandler = (event) => {
        setDescription(event.target.value);
    }

    const addTechTag = (event) => {
        if (event.key === "Enter") {
            let actualTech = techs;
            actualTech.push(tech)
            setTechs(actualTech)
            setTech("")
        }
    }

    const details = () => {

        return (
            <div className="projects-card-container">
                <div className="information-container">
                    <div className="information-form">
                        Información
                        <div className="text-area-label">
                            Descripción
                            <textarea value={description} onChange={setDescriptionHandler} name="Text1" cols="40"
                                      rows="5"/>
                        </div>
                    </div>
                </div>
                <div className="create-project-buttons">
                    <button disabled={buttonDisabled} className={buttonDisabled ? "create-project-from-button-disabled" : "create-project-from-button"} onClick={projectButton}>
                        {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        {buttonDisabled ? "" : state === null ? "Crear" : "Guardar"}
                    </button>
                </div>
            </div>
        )
    }

    const BasicInfo = () => {
        return (
            <div className="create-project-info-container">
                <div className="create-project-info">
                    Información Básica
                    <form className="create-project-form">
                        <label className="create-project-label">
                            Nombre
                            <div className="create-project-input">
                                <input type="text" value={name} className="input" onChange={setNameHandler}/>
                            </div>
                        </label>
                        <label className="create-project-label">
                            Idioma
                            <div className="create-project-input">
                                <select value={language} className="select" onChange={setLanguageHandler}>
                                    <option value="Aleman">Aleman</option>
                                    <option value="Chino">Chino</option>
                                    <option value="Español">Español</option>
                                    <option value="Frances">Frances</option>
                                    <option value="Inglés">Inglés</option>
                                    <option value="Portugues">Portugues</option>
                                </select>
                                <ArrowDown2 className="from-button" color="#B1B1B1" variant="Outline" size={20}/>
                            </div>
                        </label>
                        <label className="create-project-label">
                            Tecnologías
                            <div className="create-project-input">
                                <input type="text" value={tech} className="input" onChange={setTechHandler}
                                       onKeyUp={addTechTag}/>
                                <div className="modal-tags-container">
                                    {techs.map((value) => {
                                        return <TechnologyTag key={value} technology={value}/>
                                    })}
                                </div>
                            </div>
                        </label>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="projects-screen">
                <div className="projects-header">
                    {state === null ? "Nuevo Proyecto" : "Editar Proyecto"}
                </div>
                <div className="projects-container">
                    {BasicInfo()}
                    {details()}
                </div>
                <SearchBar/>
                <SideBar/>
            </div>
        </div>
    )

}
