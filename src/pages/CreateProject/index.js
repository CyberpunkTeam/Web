import './style.css';
import SideBar from "../../components/SideBar";
import {useLocation, useNavigate} from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {createProject, updateProject} from "../../services/projectService";
import Select from "react-select";
import {
    optionsIdioms,
    optionsLanguages,
    platformsOptions,
    frameworksOptionsData,
    databasesOptions
} from "../../config/dictonary";
import {
    selected4,
    selectedGreenStyle,
    selectedViolet,
    selectedViolet2,
    selectedViolet3
} from "../../styles/commonStyles";
import {AttachSquare, Gallery, Trash, Document} from "iconsax-react";
import {saveFile} from "../../services/firebaseStorage";
import {isMobile} from "react-device-detect";

export default function CreateProjectScreen() {
    const {state} = useLocation();
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const valuesSelected = (data) => {
        let list = []
        data.forEach((value) => {
            list.push({value: value, label: value})
        })
        return list
    }

    const getFrameworksOptions = (data) => {
        let list = []
        data.forEach((value) => {
            if (Object.keys(frameworksOptionsData).includes(value)) {
                list = list.concat(frameworksOptionsData[value])
            }
        })
        return list
    }

    const defaultValues = state.project !== undefined ? valuesSelected(state.project.technologies.programming_language) : []
    const IdiomsDefaultValues = state.project !== undefined ? valuesSelected(state.project.idioms) : []
    const frameworksDefaultValues = state.project !== undefined ? valuesSelected(state.project.technologies.frameworks) : []
    const platformsDefaultValues = state.project !== undefined ? valuesSelected(state.project.technologies.platforms) : []
    const databasesDefault = state.project !== undefined ? valuesSelected(state.project.technologies.databases) : []

    const [name, setName] = useState(state.project === undefined ? "" : state.project.name)
    const [description, setDescription] = useState(state.project === undefined ? "" : state.project.description.summary)
    const [languages, setLanguages] = useState(state.project === undefined ? [] : [...state.project.idioms])
    const [techs, setTechs] = useState(state.project === undefined ? [] : [...state.project.technologies.programming_language]);
    const [platforms, setPlatforms] = useState(state.project === undefined ? [] : [...state.project.technologies.platforms]);
    const [db, setDb] = useState(state.project === undefined ? [] : [...state.project.technologies.databases])
    const [frameworksOptions, setFrameworksOptions] = useState(state.project === undefined ? [] : getFrameworksOptions(state.project.technologies.programming_language));
    const [frameworks, setFrameworks] = useState(state.project === undefined ? [] : [...state.project.technologies.frameworks]);
    const [estimatedBudget, setEstimatedBudget] = useState(state.project === undefined ? "0" : state.project.tentative_budget)
    const [timeValue, setTimeValue] = useState(state.project === undefined ? "0" : state.project.tentative_duration)
    const [coin, setCoin] = useState("DOLAR")
    const [time, setTime] = useState(state.project === undefined ? "Months" : state.project.unit_duration)
    const type = state.project === undefined ? state.type : state.project.project_type
    const [files, setFiles] = useState(state.project === undefined ? [] : state.project.description.files_attached.length === 0 ? [] : state.project.description.files_attached[0].files);
    const [images, setImages] = useState(state.project === undefined ? [] : state.project.description.files_attached.length === 0 ? [] : state.project.description.files_attached[0].images);

    function handleFilesChange(e) {
        if (Array.from(e.target.files).length > 5 - files.length) {
            e.preventDefault();
            alert(`Cannot upload files more than five`);
            return;
        }
        let filesList = [...files]
        Object.keys(e.target.files).forEach((key) => {
            if (!files.includes(e.target.files[key])) {
                filesList.push(e.target.files[key])
            }
        })
        setFiles(filesList);
    }

    function handleImagesChange(e) {
        if (Array.from(e.target.files).length > 5 - images.length) {
            e.preventDefault();
            alert(`Cannot upload images more than five`);
            return;
        }
        let imagesList = [...images]
        Object.keys(e.target.files).forEach((key) => {
            if (!images.includes(e.target.files[key])) {
                imagesList.push(e.target.files[key])
            }
        })
        setImages(imagesList);
    }

    const deleteImage = (index) => {
        let imagesList = [...images]
        imagesList.splice(index, 1)
        setImages(imagesList);
    }

    const deleteFile = (index) => {
        let filesList = [...files]
        filesList.splice(index, 1)
        setFiles(filesList);
    }

    const projectButton = () => {
        setButtonDisabled(true)

        let filesUrl = []
        files.forEach((file) => {
            if (typeof file === "string") {
                filesUrl.push(file)
                return
            }
            saveFile(context.app, file, name + "-file-" + file.name).then((r) => {
                filesUrl.push(r)
            })
        })

        let imagesUrl = []
        images.forEach((file) => {
            if (typeof file === "string") {
                imagesUrl.push(file)
                return
            }
            saveFile(context.app, file, name + "-image-" + file.name).then((r) => {
                imagesUrl.push(r)
            })
        })

        const body = {
            "name": name,
            "idioms": languages,
            "creator_uid": context.user.uid,
            "project_type": type,
            "description": {
                "files_attached": [{"files": filesUrl, images: imagesUrl}],
                "functional_requirements": [],
                "non_function_requirements": [],
                "summary": description
            },
            "technologies": {
                "programming_language": techs,
                "databases": db,
                "frameworks": frameworks,
                "platforms": platforms
            },
            "tentative_budget": estimatedBudget,
            "budget_currency": "DOLAR",
            "tentative_duration": timeValue,
            "unit_duration": time.toUpperCase()
        }

        if (state.project === undefined) {
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
        setFrameworksOptions(getFrameworksOptions(list))
        setTechs(list)
    }

    const setPlatformsHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setPlatforms(list)
    }

    const setFrameworksHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setFrameworks(list)
    }

    const setDBHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setDb(list);
    }

    const setDescriptionHandler = (event) => {
        if (event.target.value.length >= 2000) {
            setDescription(event.target.value.slice(0, 2000));
            return
        }
        setDescription(event.target.value);
    }

    const setEstimatedBudgetHandler = (event) => {
        setEstimatedBudget(event.target.value);
    }

    const setCoinHandler = (event) => {
        setCoin(event.target.value);
    }

    const setTimeHandler = (event) => {
        setTime(event.target.value);
    }

    const setTimeValueHandler = (event) => {
        setTimeValue(event.target.value);
    }

    const filesUploads = (file, index) => {
        return (
            <div key={file.name} className="input-image-container">
                <Document className="input-docs" size={28} color="#FAFAFA"/>
                .{file.type.split("/")[1]}
                <Trash color="#FAFAFA" variant="Bold" size={16} className={"input-image-trash"} onClick={() => {
                    deleteFile(index)
                }}/>
            </div>
        )
    }

    const imagesUploads = (file, index) => {
        let url;
        try {
            url = URL.createObjectURL(file);
        } catch (e) {
            url = file;
        }
        return (
            <div key={file.name} className="input-image-container">
                <img src={url} alt='' className="input-image"/>
                <Trash color="#FAFAFA" variant="Bold" size={16} className={"input-image-trash"} onClick={() => {
                    deleteImage(index)
                }}/>
            </div>
        )
    }

    const details = () => {
        return (
            <div className="projects-description-container">
                <div className="information-container">
                    <div className="information-form">
                        <div className="text-area-label">
                            Summary
                            <textarea className="textarea-style" value={description} onChange={setDescriptionHandler}
                                      name="Text1" cols="40"
                                      rows="5"/>
                        </div>
                        <div className={"files-upload"}>
                            <div>
                                <label>
                                    <input type="file"
                                           disabled={files.length === 5}
                                           multiple onChange={handleFilesChange}
                                           accept="application/doc, application/txt, application/pdf, .json, text/plain"/>
                                    <AttachSquare size="20"
                                                  className={files.length === 5 ? "icon-input-images-full" : "icon-input-images"}
                                                  color="#FAFAFA"/>
                                </label>
                                <label>
                                    <input type="file" multiple onChange={handleImagesChange}
                                           disabled={images.length === 5}
                                           accept="image/jpeg, image/png"/>
                                    <Gallery size="20"
                                             className={images.length === 5 ? "icon-input-images-full" : "icon-input-images"}
                                             color="#FAFAFA"/>
                                </label>
                            </div>
                            {description.length + "/2000"}
                        </div>
                        <div className={"input-files"}>
                            {files.map((file, index) => {
                                return filesUploads(file, index)
                            })}
                            {images.map((file, index) => {
                                return imagesUploads(file, index)
                            })}
                        </div>
                    </div>
                </div>
                <div className="information-container">
                    <div className={"information-form"}>
                        <div className="text-area-label">
                            Functional Requirements
                            <textarea className="reqTextAreaStyle" value={description} onChange={setDescriptionHandler}
                                      name="Text1" cols="40"
                                      rows="5"/>
                        </div>
                        <div className="text-area-label">
                            No Functional Requirements
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={platformsDefaultValues}
                                    options={platformsOptions}
                                    onChange={(choice) => setPlatformsHandler(choice)}
                                    name="Technologies"
                                    styles={selectedViolet2}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="create-project-buttons">
                    <button disabled={buttonDisabled}
                            className={buttonDisabled ? "create-project-from-button-disabled" : "create-project-from-button"}
                            onClick={projectButton}>
                        {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        {buttonDisabled ? "" : state.project === undefined ? "Create" : "Save"}
                    </button>
                </div>
            </div>
        )
    }

    const BasicInfoLeft = () => {
        return (
            <div className={context.size ? "create-project-info-container-reduced" : "create-project-info-container"}>
                <div className={context.size ? "create-project-info-reduced" : "create-project-info"}>
                    <form className="create-project-form">
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Name
                            <div className="create-project-input">
                                <input type="text" value={name} className="input" onChange={setNameHandler}/>
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Total Budget
                            <div className="budget-input-container">
                                <input type="number" min="0" value={estimatedBudget} className="budget-input"
                                       onChange={setEstimatedBudgetHandler}/>
                                <select value={coin} className="select-coin" onChange={setCoinHandler}>
                                    <option value="DOLAR">USD</option>
                                </select>
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Estimated Completion Time
                            <div className="budget-input-container">
                                <input type="number" min="0" value={timeValue} className="budget-input"
                                       onChange={setTimeValueHandler}/>
                                <select value={time} className="select-coin" onChange={setTimeHandler}>
                                    <option value="HOURS">Hours</option>
                                    <option value="DAYS">Days</option>
                                    <option value="MONTHS">Months</option>
                                </select>
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Languages
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={IdiomsDefaultValues}
                                    options={optionsIdioms}
                                    onChange={(choice) => setLanguageHandler(choice)}
                                    name="Technologies"
                                    styles={selectedGreenStyle}
                                />
                            </div>
                        </label>
                    </form>
                </div>
            </div>
        )
    }

    const BasicInfoRight = () => {
        return (
            <div className={context.size ? "create-project-info-container-reduced" : "create-project-info-container"}>
                <div className={context.size ? "create-project-info-reduced" : "create-project-info"}>
                    <form className="create-project-form">
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Programming Languages
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={defaultValues}
                                    options={optionsLanguages}
                                    onChange={(choice) => setTechHandler(choice)}
                                    name="Technologies"
                                    styles={selectedViolet}
                                />
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Frameworks
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={frameworksDefaultValues}
                                    options={frameworksOptions}
                                    onChange={(choice) => setFrameworksHandler(choice)}
                                    name="Technologies"
                                    styles={selectedViolet3}
                                />
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Platforms
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={platformsDefaultValues}
                                    options={platformsOptions}
                                    onChange={(choice) => setPlatformsHandler(choice)}
                                    name="Technologies"
                                    styles={selectedViolet2}
                                />
                            </div>
                        </label>
                        <label className={context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Databases
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={databasesDefault}
                                    options={databasesOptions}
                                    onChange={(choice) => setDBHandler(choice)}
                                    styles={selected4}
                                />
                            </div>
                        </label>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="projects-screen">
            <div className="create-projects-header">
                {state.project === undefined ? type === "Base" ? "New Project" : "New " + type + " Project" : "Edit Project"}
            </div>
            <div>
                <div className={context.size ? "projects-cards-reduced" : "projects-cards"}>
                    {BasicInfoLeft()}
                    {BasicInfoRight()}
                </div>
                {details()}
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    )

}
