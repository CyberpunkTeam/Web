import './style.css';
import SideBar from "../../components/SideBar";
import {useLocation, useNavigate} from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {createProject, updateProject} from "../../services/projectService";
import Select from "react-select";
import {optionsIdioms, optionsLanguages} from "../../config/dictonary";

export default function CreateProjectScreen() {
    const {state} = useLocation();
    const navigate = useNavigate();
    let context = useContext(AppContext);

    const techValuesSelected = () => {
        let list = []
        if (state !== null) {
            state.project.technologies.programming_language.forEach((value) => {
                list.push({value: value, label: value})
            })
        }
        return list
    }

    const lengValuesSelected = () => {
        let list = []
        if (state !== null) {
            state.project.idioms.forEach((value) => {
                list.push({value: value, label: value})
            })
        }
        return list
    }

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [name, setName] = useState(state === null ? "" : state.project.name)
    const defaultValues = techValuesSelected()
    const IdiomsDefaultValues = lengValuesSelected()
    const [description, setDescription] = useState(state === null ? "" : state.project.description.summary)
    const [languages, setLanguages] = useState(state === null ? [] : [...state.project.idioms])
    const [techs, setTechs] = useState(state === null ? [] : [...state.project.technologies.programming_language]);

    const projectButton = () => {
        setButtonDisabled(true)

        const body = {
            "name": name,
            "idioms": languages,
            "creator_uid": context.user.uid,
            "description": {
                "files_attached": [],
                "functional_requirements": [],
                "non_function_requirements": [],
                "summary": description
            },
            "technologies": {
                "programming_language": techs,
                "frameworks": [],
                "platforms": []
            },
            "tentative_budget": 0,
            "budget_currency": "DOLAR",
            "tentative_duration": 0,
            "unit_duration": "HOURS"
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
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setLanguages(list);
    }

    const setTechHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setTechs(list)
    }

    const setDescriptionHandler = (event) => {
        setDescription(event.target.value);
    }

    const details = () => {
        return (
            <div className="projects-card-container">
                <div className="information-container">
                    <div className="information-form">
                        Extra Information
                        <div className="text-area-label">
                            Description
                                <textarea value={description} onChange={setDescriptionHandler} name="Text1" cols="40" rows="5"/>
                        </div>
                    </div>
                </div>
                <div className="create-project-buttons">
                    <button disabled={buttonDisabled} className={buttonDisabled ? "create-project-from-button-disabled" : "create-project-from-button"} onClick={projectButton}>
                        {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        {buttonDisabled ? "" : state === null ? "Create" : "Save"}
                    </button>
                </div>
            </div>
        )
    }

    const BasicInfo = () => {
        return (
            <div className="create-project-info-container">
                <div className="create-project-info">
                    Basic Information
                    <form className="create-project-form">
                        <label className="create-project-label">
                            Name
                            <div className="create-project-input">
                                <input type="text" value={name} className="input" onChange={setNameHandler}/>
                            </div>
                        </label>
                        <label className="create-project-label">
                            Language
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={IdiomsDefaultValues}
                                    options={optionsIdioms}
                                    onChange={(choice) => setLanguageHandler(choice)}
                                    name="Technologies"
                                    styles={{
                                        control: () => ({
                                            display: "flex",
                                            minHeight: "32px",
                                            padding: "4px 0",
                                            borderRadius: "16px",
                                            background: "#E3E3E3",
                                            border: "none"
                                        }),
                                        multiValueLabel: () => ({
                                                background: "#089BAD",
                                                color: "#FAFAFA",
                                                padding: "4px 0 4px 8px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderTopLeftRadius: "8px",
                                                borderBottomLeftRadius: "8px"
                                            }
                                        ),
                                        multiValueRemove: (theme, state) => ({
                                            background: "#089BAD",
                                            color: "#FAFAFA",
                                            display: "flex",
                                            padding: "4px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderTopRightRadius: "8px",
                                            borderBottomRightRadius: "8px",
                                            cursor: "pointer",
                                            ':hover': {
                                                backgroundColor: "#CD5B45"
                                            },
                                        })
                                    }}
                                />
                            </div>
                        </label>
                        <label className="create-project-label">
                            Technologies
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={defaultValues}
                                    options={optionsLanguages}
                                    onChange={(choice) => setTechHandler(choice)}
                                    name="Technologies"
                                    styles={{
                                        control: () => ({
                                            display: "flex",
                                            minHeight: "32px",
                                            padding: "4px 0",
                                            borderRadius: "16px",
                                            background: "#E3E3E3",
                                            border: "none"
                                        }),
                                        multiValueLabel: () => ({
                                                background: "#8D64CC",
                                                color: "#FAFAFA",
                                                padding: "4px 0 4px 8px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderTopLeftRadius: "8px",
                                                borderBottomLeftRadius: "8px"
                                            }
                                        ),
                                        multiValueRemove: (theme, state) => ({
                                            background: "#8D64CC",
                                            color: "#FAFAFA",
                                            display: "flex",
                                            padding: "4px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderTopRightRadius: "8px",
                                            borderBottomRightRadius: "8px",
                                            cursor: "pointer",
                                            ':hover': {
                                                backgroundColor: "#CD5B45"
                                            },
                                        })
                                    }}
                                />
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
                    {state === null ? "New Project" : "Edit Project"}
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
