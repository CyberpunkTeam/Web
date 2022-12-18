import './style.css';
import SideBar from "../../components/SideBar";
import {useNavigate} from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import {ArrowDown2} from "iconsax-react";
import {useState} from "react";

export default function CreateProjectScreen() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [tech, setTech] = useState("")
    const [language, setLanguage] = useState("Inglés")
    const [techs, setTechs] = useState([]);


    const setNameHandler = (event) => {
        setName(event.target.value);
    }

    const setLanguageHandler = (event) => {
        setLanguage(event.target.value);
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

    const tag = (value) => {
        return (
            <div id={value} className={"modal-tag"}>
                {value}
            </div>
        )
    }

    const details = () => {

        return (
            <div className="projects-card-container">
                <div className="information-container">
                    <div className="information-form">
                        Información
                        <div className="text-area-label">
                            Descripción
                            <textarea name="Text1" cols="40" rows="5"/>
                        </div>
                    </div>
                </div>
                <div className="create-project-buttons">
                    <button className="cancel-project-button" onClick={() => {navigate("/projects")}}>Cancelar</button>
                    <button className="create-project-from-button">Crear</button>
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
                                <input type="text" value={tech} className="input" onChange={setTechHandler} onKeyUp={addTechTag}/>
                                <div className="modal-tags-container">
                                    {techs.map((value) => {
                                        return tag(value)
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
                    Nuevo Proyecto
                </div>
                <div className="projects-container">
                    {BasicInfo()}
                    {details()}
                </div>
            </div>

            <SearchBar/>
            <SideBar/>
        </div>
    )

}
