import TechnologyTag from "../TechnologyTag";
import PreferenceTag from "../PreferenceTag";
import {createTeam, updateTeam} from "../../services/teamService";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {useNavigate} from "react-router-dom";
import {CloseCircle} from "iconsax-react";
import {optionsLanguages} from "../../config/dictonary"
import Select from "react-select";

export default function TeamModal(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const techValuesSelected = () => {
        let list = []
        if (params.team !== undefined) {
            params.team.technologies.forEach((value) => {
                list.push({value: value, label: value})
            })
        }
        return list
    }

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [teamName, setTeamName] = useState(params.team !== undefined ? params.team.name : "");
    const [pref, setPref] = useState("");
    const defaultValues = techValuesSelected()
    const [techs, setTechs] = useState(params.team !== undefined ? [...params.team.technologies] : []);
    const [prefs, setPrefs] = useState(params.team !== undefined ? [...params.team.project_preferences] : []);

    const setTeamHandler = (event) => {
        setTeamName(event.target.value);
    }

    const setPrefHandler = (event) => {
        setPref(event.target.value);
    }

    const setTechHandler = (event) => {
        let list = []
        event.forEach((value) => {
            list.push(value.value)
        })
        setTechs(list)
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
            return (
                <>
                    <button className="cancel-edit-button-style" onClick={params.closeModal}>
                        Cancel
                    </button>
                    <button disabled={buttonDisabled}
                            className={buttonDisabled ? "save-edit-button-style-disabled" : "save-edit-button-style"}
                            onClick={updateTeamButton}>
                        {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : "Save"}
                    </button>
                </>
            )
        }
        return (
            <>
                <button className="cancel-edit-button-style" onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        className={buttonDisabled ? "save-edit-button-style-disabled" : "save-edit-button-style"}
                        onClick={createTeamButton}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : "Create"}
                </button>
            </>
        )
    }

    return (
        <div className="modal-container">
            <div className="form-text">
                {params.team !== undefined ? "Edit Team" : "Create a New Team"}
            </div>
            <form className="modal-form">
                <div className="label">
                    <label>
                        Name
                        <div className="modal-form-input">
                            <input type="text" value={teamName} className="input" onChange={setTeamHandler}/>
                        </div>
                    </label>
                    <label>
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
                    <label>
                        Project Preferences
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
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )
}
