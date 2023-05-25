import {User} from "iconsax-react";
import React, {useContext, useState} from "react";
import {sendTeamPostulation} from "../../services/notificationService";
import {useLocation, useNavigate} from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import AppContext from "../../utils/AppContext";

export default function PostulateTeam() {
    let context = useContext(AppContext);
    const {state} = useLocation();
    const navigate = useNavigate();
    const params = state
    const [teamName, setTeamName] = useState(params.teams[0].name)
    const [teamIndex, setTeamIndex] = useState(0)
    const [description, setDescription] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [estimatedBudget, setEstimatedBudget] = useState(params.budget)
    const [coin, setCoin] = useState("DOLAR")

    const goBack = () => {
        navigate(-1)
    }

    const setTeamHandler = (event) => {
        params.teams.map((team, index) => {
            if (team.name === event.target.value) {
                setTeamIndex(index)
            }
            return null
        })
        setTeamName(event.target.value);
    }

    const setCoinHandler = (event) => {
        setCoin(event.target.value);
    }

    const setEstimatedBudgetHandler = (event) => {
        setEstimatedBudget(event.target.value);
    }

    const setDescriptionHandler = (event) => {
        setDescription(event.target.value);
    }

    const showTeamMembers = (data) => {
        if (data.profile_image === "default") {
            return (
                <div key={data.uid} className="member-photo-postulation-mobile">
                    <div className="photo-postulation-mobile">
                        <User color="#FAFAFA" size="50" variant="Bold"/>
                    </div>
                </div>
            )
        } else {
            return (
                <div key={data.uid} className="member-photo-postulation-mobile">
                    <img src={data.profile_image} alt='' className="photo-postulation-mobile"/>
                </div>
            )
        }
    }

    const sendTeamPostulationButton = () => {
        setButtonDisabled(true)
        const body = {
            tid: params.teams[teamIndex].tid,
            pid: params.pid,
            estimated_budget: parseInt(estimatedBudget),
            currency: "DOLAR",
            proposal_description: description
        }
        sendTeamPostulation(body).then(() => {
            context.setCreateMessage("You have successfully postulated to the team")
            setButtonDisabled(false)
            goBack()
        })
    }


    return (
        <div className="profile-screen-mobile">
            <div className={"profile-container"}>
                <form className="edit-form-mobile">
                    <label className="label-mobile">
                        Select a Team
                        <div className="modal-form-input">
                            <select value={teamName} className="postulation-input-mobile" onChange={setTeamHandler}>
                                {params.teams.map((e, index) => {
                                    return <option key={index} value={e.name}>{e.name}</option>;
                                })}
                            </select>
                        </div>
                        <div className="members-postulation">
                            {params.teams[teamIndex].members.map((user) => {
                                return (showTeamMembers(user))
                            })}
                        </div>
                    </label>
                    <label className="label-mobile">
                        Budget
                        <div className="budget-input-container">
                            <input type="number" min="0" value={estimatedBudget} className="budget-input-mobile"
                                   onChange={setEstimatedBudgetHandler}/>
                            <select value={coin} className="select-coin-mobile" onChange={setCoinHandler}>
                                <option value="DOLAR">USD</option>
                            </select>
                        </div>
                    </label>
                    <label className="label-mobile">
                        Description
                        <textarea className="text-area-style-mobile" value={description} onChange={setDescriptionHandler}
                                  name="Text1"
                                  cols="40"
                                  rows="5"/>
                    </label>
                </form>
                <div className="container-button-mobile">
                    <button className="cancel-edit-button-mobile-style" onClick={goBack}>
                        Back
                    </button>
                    <button disabled={buttonDisabled}
                            className={buttonDisabled ? "button-style-disabled-mobile" : "button-style-mobile"}
                            onClick={sendTeamPostulationButton}>
                        {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        {buttonDisabled ? "" : "Save"}
                    </button>
                </div>
            </div>
            <SearchBar/>
            <SideBar/>
        </div>
    )

}
