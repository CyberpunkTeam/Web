import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {updateUser} from "../../services/userService";
import {CloseCircle} from "iconsax-react";

import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import {
    CloudOptions,
    databasesOptions,
    frameworksOptionsDataAll, MethodologiesOptions,
    optionsLanguages,
    platformsOptions
} from "../../config/dictonary";
import {
    selected4,
    selectedColor5,
    selectedGreenStyle,
    selectedViolet,
    selectedViolet2,
    selectedViolet3
} from "../../styles/commonStyles";

export default function AddSkillModal(params) {
    let context = useContext(AppContext);
    const errorMessageUpdate = "An error has occurred while updating user information. Please, try again later"

    const valuesSelected = (data) => {
        let list = []
        data.forEach((value) => {
            list.push({value: value, label: value})
        })
        return list
    }

    const languagesDefault = params.userData.user.skills === null ? [] : valuesSelected(params.userData.user.skills.programming_language)
    const frameworksDefault = params.userData.user.skills === null ? [] : valuesSelected(params.userData.user.skills.frameworks)
    const platformsDefault = params.userData.user.skills === null ? [] : valuesSelected(params.userData.user.skills.platforms)
    const cloudProvidersDefault = params.userData.user.skills === null ? [] : valuesSelected(params.userData.user.skills.cloud_providers)
    const databasesDefault = params.userData.user.skills === null ? [] : valuesSelected(params.userData.user.skills.databases)
    const methDefault = params.userData.user.skills === null ? [] : valuesSelected(params.userData.user.skills.methodologies)

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [languages, setLanguages] = useState(params.userData.user.skills === null ? [] : params.userData.user.skills.programming_language)
    const [frameworks, setFrameworks] = useState(params.userData.user.skills === null ? [] : params.userData.user.skills.frameworks)
    const [platforms, setPlatforms] = useState(params.userData.user.skills === null ? [] : params.userData.user.skills.platforms)
    const [cloud, setCloud] = useState(params.userData.user.skills === null ? [] : params.userData.user.skills.cloud_providers)
    const [db, setDb] = useState(params.userData.user.skills === null ? [] : params.userData.user.skills.databases)
    const [meth, setMeth] = useState(params.userData.user.skills === null ? [] : params.userData.user.skills.methodologies)

    const setLanguageHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setLanguages(list);
    }

    const setFrameworksHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setFrameworks(list);
    }

    const setPlatformsHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setPlatforms(list);
    }

    const setCloudHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setCloud(list);
    }

    const setDBHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setDb(list);
    }

    const setMethHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setMeth(list);
    }

    const addSkills = () => {
        setButtonDisabled(true)
        const body = {
            skills: {
                programming_language: languages,
                frameworks: frameworks,
                platforms: platforms,
                cloud_providers: cloud,
                databases: db,
                methodologies: meth
            }
        }

        updateUser(context.user.uid, body).then((response) => {
            if (response === undefined) {
                if (context.errorMessage !== errorMessageUpdate) {
                    context.setErrorMessage(errorMessageUpdate);
                }
            } else {
                context.setUser(response);
                localStorage.setItem("user", JSON.stringify(response))
                params.closeModal()
            }
            setButtonDisabled(false)
        })

    }

    return (
        <div className={"modal-container"}>
            <div className="form-text-modal">
                Add Skill
            </div>
            <form className="modal-form-div">
                <div className={"column-skills-left"}>
                    <label className={"add-skill-label"}>
                        Programming Languages ({languages.length}/3)
                        <div className="modal-form-input-select">
                            <Select
                                isMulti
                                isOptionDisabled={(option) => languages.length === 3}
                                defaultValue={languagesDefault}
                                options={optionsLanguages}
                                onChange={(choice) => setLanguageHandler(choice)}
                                styles={selectedViolet}
                            />
                        </div>
                    </label>
                    <label className={"add-skill-label"}>
                        Frameworks ({frameworks.length}/3)
                        <div className="modal-form-input-select">
                            <Select
                                isMulti
                                isOptionDisabled={(option) => frameworks.length === 3}
                                defaultValue={frameworksDefault}
                                options={frameworksOptionsDataAll}
                                onChange={(choice) => setFrameworksHandler(choice)}
                                styles={selectedViolet3}
                            />
                        </div>
                    </label>
                    <label className={"add-skill-label"}>
                        Platforms ({platforms.length}/3)
                        <div className="modal-form-input-select">
                            <Select
                                isMulti
                                isOptionDisabled={(option) => platforms.length === 3}
                                defaultValue={platformsDefault}
                                options={platformsOptions}
                                onChange={(choice) => setPlatformsHandler(choice)}
                                styles={selectedViolet2}
                            />
                        </div>
                    </label>
                </div>
                <div className={"column-skills-right"}>
                    <label className={"add-skill-label"}>
                        Cloud Providers ({cloud.length}/3)
                        <div className="modal-form-input-select">
                            <Select
                                isMulti
                                isOptionDisabled={(option) => cloud.length === 3}
                                defaultValue={cloudProvidersDefault}
                                options={CloudOptions}
                                onChange={(choice) => setCloudHandler(choice)}
                                styles={selected4}
                            />
                        </div>
                    </label>
                    <label className={"add-skill-label"}>
                        Databases ({db.length}/3)
                        <div className="modal-form-input-select">
                            <Select
                                isMulti
                                isOptionDisabled={(option) => db.length === 3}
                                defaultValue={databasesDefault}
                                options={databasesOptions}
                                onChange={(choice) => setDBHandler(choice)}
                                styles={selectedColor5}
                            />
                        </div>
                    </label>
                    <label className={"add-skill-label"}>
                        Methodologies ({meth.length}/3)
                        <div className="modal-form-input-select">
                            <Select
                                isMulti
                                isOptionDisabled={(option) => meth.length === 3}
                                defaultValue={methDefault}
                                options={MethodologiesOptions}
                                onChange={(choice) => setMethHandler(choice)}
                                styles={selectedGreenStyle}
                            />
                        </div>
                    </label>
                </div>
            </form>
            <div className="container-button-modal">
                <button className="cancel-edit-button-style" onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        className={buttonDisabled ? "save-edit-button-style-disabled" : "save-edit-button-style"}
                        onClick={addSkills}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : "Save"}
                </button>
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )
}
