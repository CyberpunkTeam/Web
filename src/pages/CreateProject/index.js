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
    databasesOptions, Requirements
} from "../../config/dictonary";
import {
    selected4, selectedCloud, selectedFrameworks,
    selectedGreenStyle, selectedLanguages, selectedPlatform,
    selectedViolet,
    selectedViolet2,
    selectedViolet3, selectPref
} from "../../styles/commonStyles";
import {AttachSquare, Gallery, Trash, Document} from "iconsax-react";
import {saveFile} from "../../services/firebaseStorage";
import {isMobile} from "react-device-detect";
import AlertMessage from "../../components/AlertMessage";

export default function CreateProjectScreen() {
    const {state} = useLocation();
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const errorMessageUpdate = "An error has occurred while updating project's information. Please, try again later"
    const errorMessageCreate = "An error has occurred while creating the project. Please, try again later"

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
    const [techs, setTechs] = useState(state.project === undefined ? [] : [...state.project.technologies.programming_language]);

    const IdiomsDefaultValues = state.project !== undefined ? valuesSelected(state.project.idioms) : []
    const [languages, setLanguages] = useState(state.project === undefined ? [] : [...state.project.idioms])

    const frameworksDefaultValues = state.project !== undefined ? valuesSelected(state.project.technologies.frameworks) : []
    const [frameworks, setFrameworks] = useState(state.project === undefined ? [] : [...state.project.technologies.frameworks]);
    const [frameworksOptions, setFrameworksOptions] = useState(state.project === undefined ? [] : getFrameworksOptions(state.project.technologies.programming_language));

    const platformsDefaultValues = state.project !== undefined ? valuesSelected(state.project.technologies.platforms) : []
    const [platforms, setPlatforms] = useState(state.project === undefined ? [] : [...state.project.technologies.platforms]);

    const databasesDefault = state.project !== undefined ? valuesSelected(state.project.technologies.databases) : []
    const [db, setDb] = useState(state.project === undefined ? [] : [...state.project.technologies.databases])

    const reqDefault = state.project !== undefined ? valuesSelected(state.project.description.non_function_requirements) : []
    const [req, setReq] = useState(state.project === undefined ? [] : [...state.project.description.non_function_requirements])

    const [name, setName] = useState(state.project === undefined ? "" : state.project.name)
    const [description, setDescription] = useState(state.project === undefined ? "" : state.project.description.summary)
    const [requirementsFunctional, setRequirementsFunctional] = useState(state.project === undefined ? "" : state.project.description.functional_requirements)

    const [estimatedBudget, setEstimatedBudget] = useState(state.project === undefined ? "0" : state.project.tentative_budget)
    const [coin, setCoin] = useState("DOLAR")

    const [timeValue, setTimeValue] = useState(state.project === undefined ? "0" : state.project.tentative_duration)
    const [time, setTime] = useState(state.project === undefined ? "Months" : state.project.unit_duration)

    const type = state.project === undefined ? state.type : state.project.project_type
    const [files, setFiles] = useState(state.project === undefined ? [] : state.project.description.files_attached.files === undefined ? [] : state.project.description.files_attached.files);
    const [images, setImages] = useState(state.project === undefined ? [] : state.project.description.files_attached.images === undefined ? [] : state.project.description.files_attached.images);

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

    const projectButton = async () => {
        setButtonDisabled(true)

        let filesUrl = []
        for (const file of files) {
            if (typeof file === "string") {
                filesUrl.push(file)
                continue;
            }
            filesUrl.push(await saveFile(context.app, file, name + "-file-" + file.name))
        }

        let imagesUrl = []
        for (const file of images) {
            if (typeof file === "string") {
                imagesUrl.push(file)
                continue;
            }
            imagesUrl.push(await saveFile(context.app, file, name + "-image-" + file.name))
        }

        const body = {
            "name": name,
            "idioms": languages,
            "creator_uid": context.user.uid,
            "project_type": type,
            "description": {
                "files_attached": {files: filesUrl, images: imagesUrl},
                "functional_requirements": requirementsFunctional,
                "non_function_requirements": req,
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
                if (r === undefined) {
                    if (context.errorMessage !== errorMessageCreate) {
                        context.setErrorMessage(errorMessageCreate);
                    }
                } else {
                    window.scrollTo(0, 0);
                    navigate("/projects/" + r.pid + "/teamRecommendation", {
                        state: {
                            teams: r.teams_recommendations,
                            project: r.pid
                        }
                    })
                }
                setButtonDisabled(false)
            })
        } else {
            updateProject(state.project.pid, body).then((r) => {
                if (r === undefined) {
                    if (context.errorMessage !== errorMessageUpdate) {
                        context.setErrorMessage(errorMessageUpdate);
                    }
                } else {
                    window.scrollTo(0, 0);
                    navigate("/projects/" + r.pid)
                }
                setButtonDisabled(false)
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

    const setReqHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setReq(list)
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

    const setRequirementsFunctionalHandler = (event) => {
        setRequirementsFunctional(event.target.value);
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
        let name = ""
        if (typeof file === "string") {
            name = file.split("-file-")[1].split("?")[0].split(".")[1]
        } else {
            name = file.type.split("/")[1]
        }

        return (
            <div key={file.name === undefined ? file : file.name}
                 className={isMobile ? "input-image-container-mobile" : "input-image-container"}>
                <Document className="input-docs" size={isMobile ? 46 : 28} color="#FAFAFA"/>
                .{name === undefined ? "empty" : name}
                <Trash color="#FAFAFA" variant="Bold" size={isMobile ? 32 : 16}
                       className={isMobile ? "input-image-trash-mobile" : "input-image-trash"} onClick={() => {
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
            <div key={url} className={isMobile ? "input-image-container-mobile" : "input-image-container"}>
                <img src={url} alt='' className={isMobile ? "input-image-mobile" : "input-image"}/>
                <Trash color="#FAFAFA" variant="Bold" size={isMobile ? 32 : 16}
                       className={isMobile ? "input-image-trash-mobile" : "input-image-trash"} onClick={() => {
                    deleteImage(index)
                }}/>
            </div>
        )
    }

    const goBack = () => {
        if (state.project !== undefined) {
            navigate("/projects/" + state.project.pid)
            return
        }
        navigate("/projects")
    }

    const details = () => {
        return (
            <div className="projects-description-container">
                <div className={isMobile ? "information-container-mobile" : "information-container"}>
                    <div className="information-form">
                        <div className={isMobile ? "text-area-label-mobile" : "text-area-label"}>
                            Summary
                            <textarea className={isMobile ? "textarea-style-mobile" : "textarea-style"}
                                      value={description} onChange={setDescriptionHandler}
                                      name="Text1" cols="40"
                                      rows="5"/>
                        </div>
                        <div className={isMobile ? "files-upload-mobile" : "files-upload"}>
                            <div>
                                <label>
                                    <input type="file"
                                           disabled={files.length === 5}
                                           multiple onChange={handleFilesChange}
                                           accept="application/doc, application/txt, application/pdf, .json, text/plain"/>
                                    <AttachSquare size={isMobile ? "54" : "20"}
                                                  className={files.length === 5 ? "icon-input-images-full" : "icon-input-images"}
                                                  color="#FAFAFA"/>
                                </label>
                                <label>
                                    <input type="file" multiple onChange={handleImagesChange}
                                           disabled={images.length === 5}
                                           accept="image/jpeg, image/png"/>
                                    <Gallery size={isMobile ? "54" : "20"}
                                             className={images.length === 5 ? "icon-input-images-full" : "icon-input-images"}
                                             color="#FAFAFA"/>
                                </label>
                            </div>
                            {description.length + "/2000"}
                        </div>
                        <div className={isMobile ? "input-files-mobile" : "input-files"}>
                            <div className={"input-files-mobile-div"}>
                                {files.map((file, index) => {
                                    return filesUploads(file, index)
                                })}
                            </div>
                            <div className={"input-files-mobile-div"}>
                                {images.map((file, index) => {
                                    return imagesUploads(file, index)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={isMobile ? "information-container-mobile" : "information-container"}>
                    <div className={"information-form"}>
                        <div className={isMobile ? "text-area-label-mobile" : "text-area-label"}>
                            Functional Requirements
                            <textarea className={isMobile ? "reqTextAreaMobileStyle" : "reqTextAreaStyle"}
                                      value={requirementsFunctional}
                                      onChange={setRequirementsFunctionalHandler}
                                      name="Text1" cols="40"
                                      rows="5"/>
                        </div>
                        <div className={isMobile ? "text-area-label-mobile" : "text-area-label"}>
                            No Functional Requirements
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    defaultValue={reqDefault}
                                    options={Requirements}
                                    onChange={(choice) => setReqHandler(choice)}
                                    styles={isMobile ? selectPref : selectedGreenStyle}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const BasicInfoLeft = () => {
        return (
            <div
                className={isMobile ? "create-project-info-container-mobile" : context.size ? "create-project-info-container-reduced" : "create-project-info-container"}>
                <div className={isMobile || context.size ? "create-project-info-reduced" : "create-project-info"}>
                    <form className="create-project-form">
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Name
                            <div className="create-project-input">
                                <input type="text" value={name} className={isMobile ? "input-mobile" : "input"}
                                       onChange={setNameHandler}/>
                            </div>
                        </label>
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Total Budget
                            <div className="budget-input-container">
                                <input type="number" min="0" value={estimatedBudget}
                                       className={isMobile ? "budget-input-mobile" : "budget-input"}
                                       onChange={setEstimatedBudgetHandler}/>
                                <select value={coin} className={isMobile ? "select-coin-mobile" : "select-coin"}
                                        onChange={setCoinHandler}>
                                    <option value="DOLAR">USD</option>
                                </select>
                            </div>
                        </label>
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Estimated Completion Time
                            <div className="budget-input-container">
                                <input type="number" min="0" value={timeValue}
                                       className={isMobile ? "budget-input-mobile" : "budget-input"}
                                       onChange={setTimeValueHandler}/>
                                <select value={time} className={isMobile ? "select-coin-mobile" : "select-coin"}
                                        onChange={setTimeHandler}>
                                    <option value="HOURS">Hours</option>
                                    <option value="DAYS">Days</option>
                                    <option value="MONTHS">Months</option>
                                </select>
                            </div>
                        </label>
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Languages ({languages.length}/3)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    isOptionDisabled={(option) => languages.length === 3}
                                    defaultValue={IdiomsDefaultValues}
                                    options={optionsIdioms}
                                    onChange={(choice) => setLanguageHandler(choice)}
                                    name="Technologies"
                                    styles={isMobile ? selectPref : selectedGreenStyle}
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
            <div
                className={isMobile ? "create-project-info-container-mobile" : context.size ? "create-project-info-container-reduced" : "create-project-info-container"}>
                <div className={isMobile || context.size ? "create-project-info-reduced" : "create-project-info"}>
                    <form className="create-project-form">
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Programming Languages ({techs.length}/5)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    isOptionDisabled={(option) => techs.length === 5}
                                    defaultValue={defaultValues}
                                    options={optionsLanguages}
                                    onChange={(choice) => setTechHandler(choice)}
                                    name="Technologies"
                                    styles={isMobile ? selectedLanguages : selectedViolet}
                                />
                            </div>
                        </label>
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Frameworks ({frameworks.length}/5)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    isOptionDisabled={(option) => frameworks.length === 5}
                                    defaultValue={frameworksDefaultValues}
                                    options={frameworksOptions}
                                    onChange={(choice) => setFrameworksHandler(choice)}
                                    name="Technologies"
                                    styles={isMobile ? selectedFrameworks : selectedViolet3}
                                />
                            </div>
                        </label>
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Platforms ({platforms.length}/5)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    isOptionDisabled={(option) => platforms.length === 5}
                                    defaultValue={platformsDefaultValues}
                                    options={platformsOptions}
                                    onChange={(choice) => setPlatformsHandler(choice)}
                                    name="Technologies"
                                    styles={isMobile ? selectedPlatform : selectedViolet2}
                                />
                            </div>
                        </label>
                        <label
                            className={isMobile ? "create-project-label-mobile" : context.size ? "create-project-label-reduced" : "create-project-label"}>
                            Databases ({db.length}/5)
                            <div className="modal-form-input-select">
                                <Select
                                    isMulti
                                    isOptionDisabled={(option) => db.length === 5}
                                    defaultValue={databasesDefault}
                                    options={databasesOptions}
                                    onChange={(choice) => setDBHandler(choice)}
                                    styles={isMobile ? selectedCloud : selected4}
                                />
                            </div>
                        </label>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className={isMobile ? "projects-screen-mobile" : "projects-screen"}>
            <div className={isMobile ? "create-projects-header-mobile" : "create-projects-header"}>
                {state.project === undefined ? type === "Base" ? "New Project" : "New " + type + " Project" : "Edit Project"}
            </div>
            <div>
                <div>
                    <div className={context.size || isMobile ? "projects-cards-reduced" : "projects-cards"}>
                        {BasicInfoLeft()}
                        {BasicInfoRight()}
                    </div>
                    {details()}
                </div>
                <div
                    className={isMobile ? "new-vacant-button-mobile" : context.size ? "new-vacant-button-reduced" : "new-vacant-button"}>
                    <button className={isMobile ? "cancel-edit-button-style-mobile" : "cancel-edit-button-style"}
                            onClick={goBack}>
                        Cancel
                    </button>
                    <button disabled={buttonDisabled}
                            className={buttonDisabled ? isMobile ? "button-style-disabled-mobile" : "save-edit-button-style-disabled" : isMobile ? "button-style-mobile" : "save-edit-button-style"}
                            onClick={projectButton}>
                        {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        {buttonDisabled ? "" : state.project !== undefined ? "Save" : "Create"}
                    </button>
                </div>
            </div>
            <SearchBar/>
            <SideBar/>
            <AlertMessage/>
        </div>
    )

}
