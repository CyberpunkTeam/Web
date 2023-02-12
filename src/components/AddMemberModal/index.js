import './style.css'
import {CloseCircle, SearchNormal1} from "iconsax-react";
import {useState} from "react";
import AddMember from "../AddMember";

export default function AddMemberModal(params) {
    const [search, setSearch] = useState("")
    const [allUsers, setAllUsers] = useState(true)

    const setSearchHandler = (event) => {
        setSearch(event.target.value);
    }

    return (
        <div className="modal-container">
            <div className="form-text-modal">
                Add Member
            </div>
            <div className="search-member-input">
                <input type="text" value={search}
                       className="search-input-text"
                       onChange={setSearchHandler}/>
                <SearchNormal1 className="search-icon" color="#B1B1B1" variant="Outline" size={20}/>
            </div>
            <div className="buttons-filter">
                <button className={allUsers ? "button-members-selected" : "button-members"} onClick={() => {
                    setAllUsers(true)
                }}>
                    All
                </button>
                <button className={allUsers ? "button-members" : "button-members-selected"} onClick={() => {
                    setAllUsers(false)
                }}>
                    Invited
                </button>
            </div>
            <div className="memberDiv">
                {params.users.map((data) => {
                    if (params.members.includes(data.uid)) {
                        return null
                    }

                    if (!allUsers && !params.invitations.includes(data.uid)) {
                        return null
                    }
                    if (data.name.toLowerCase().includes(search.toLowerCase()) || data.lastname.toLowerCase().includes(search.toLowerCase()) || data.email.toLowerCase().includes(search.toLowerCase())) {
                        return <AddMember key={data.uid} data={data} tid={params.tid} invitations={params.invitations}
                                          setInvitations={params.setInvitations}/>
                    }
                    return null
                })}
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )

}
