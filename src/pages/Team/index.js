import './style.css';
import SideBar from "../../components/SideBar";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/loading";
import {useContext, useEffect, useState} from "react";
import {getTeam, updateTeam} from "../../services/teamService";
import {AddCircle, Edit, People, SearchNormal1, User} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import SearchBar from "../../components/SearchBar";
import NotFound from "../NotFound";
import Modal from "react-modal";
import {getUsers} from "../../services/userService";
import {sendInvitation} from "../../services/notificationService";

export default function TeamScreen() {
    const params = useParams();
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isEditData, setIsEditData] = useState(false);
    const [users, setUsers] = useState([]);
    const [membersList, setMembersList] = useState([]);
    const [teamData, setTeamData] = useState(undefined)
    const [loading, setLoading] = useState(true);
    const [teamName, setTeamName] = useState("");
    const [tech, setTech] = useState("");
    const [techs, setTechs] = useState([]);
    const [prefs, setPrefs] = useState([]);
    const [pref, setPref] = useState("");

    const [search, setSearch] = useState("")

    const setTeamHandler = (event) => {
        setTeamName(event.target.value);
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

    const setPrefHandler = (event) => {
        setPref(event.target.value);
    }

    const setSearchHandler = (event) => {
        setSearch(event.target.value);
    }

    useEffect(() => {
        getTeam(params.id).then((response) => {
            setTeamData(response)
            setTeamName(response.name);
            setTechs([...response.technologies]);
            setPrefs([...response.project_preferences]);
            const list = []
            response.members.forEach((data) => {
                list.push(data.uid)
            })
            setMembersList(list)
            getUsers().then((users) => {
                setUsers(users)
                setLoading(false)
            })
        }).catch((error) => {
            console.log(error)
        });
    }, [params.id]);

    const closeModal = () => {
        setPref("")
        setTech("")
        setTeamName(teamData.name);
        setTechs([...teamData.technologies])
        setPrefs([...teamData.project_preferences])
        setIsOpen(false);
        setIsEditData(false);
    }

    if (loading) {
        return <Loading/>
    }

    const IMAGE = 'https://scopeblog.stanford.edu/wp-content/uploads/2020/08/chris-ried-ieic5Tq8YMk-unsplash-1024x684.jpg'

    const tech_tag = (technology) => {
        return (
            <div key={technology} className={"tech-tag"}>
                {technology}
            </div>
        )
    }

    const pref_tag = (preference) => {
        return (
            <div key={preference} className={"pref-tag"}>
                {preference}
            </div>
        )
    }

    const editButton = () => {
        if (teamData.owner === context.user.uid) {
            return (
                <div className="edit-button" onClick={() => {
                    setIsEditData(true)
                    setIsOpen(true);
                }
                }>
                    <Edit size="24" color="#014751"/>
                </div>
            )
        }
    }
    const cover = () => {
        return (
            <div className="cover-container">
                <div className="team-data-container">
                    <h1 className="team-name">
                        {teamData.name}
                    </h1>
                    <div className="tags-container">
                        {teamData.technologies.map((data) => {
                            return (tech_tag(data))
                        })}
                        {teamData.project_preferences.map((data) => {
                            return (pref_tag(data))
                        })}
                    </div>
                    {editButton()}
                </div>
                <img src={IMAGE} className="image-container" alt=""/>
            </div>
        )
    }

    const member = (data) => {

        return (
            <div key={data.uid} className="member">
                <div className="member-photo">
                    <User color="#FAFAFA" size="16px" variant="Bold"/>
                </div>
                <div className="member-name">
                    {data.name} {data.lastname}
                    <div className="owner">
                        {data.uid === teamData.owner ? 'Dueño' : ''}
                    </div>
                </div>
            </div>
        )
    }

    const members = () => {
        return (
            <div className="members-info-container">
                {teamData.owner === context.user.uid ?
                    <AddCircle size="24" color="#B1B1B1" className="add-button" onClick={() => {
                        setIsOpen(true)
                    }
                    }/> : null}
                <div className="members-info">
                    <div className="data-title">
                        <People size="32" color="#014751" className={"icon"}/>
                        Miembros ({teamData.members.length})
                    </div>
                    <div className="members-data">
                        <div className="members">
                            {
                                teamData.members.slice(0, 2).map((data) => {
                                    return member(data)
                                })
                            }
                        </div>
                        <div className="members">
                            {
                                teamData.members.slice(2, 4).map((data) => {
                                    return member(data)
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const editTeam = () => {
        const updateTeamButton = () => {
            const body = {
                name: teamName,
                technologies: techs,
                project_preferences: prefs
            }
            console.log(body, params.id)

            updateTeam(params.id, body).then((response) => {
                setTeamName(response.name);
                setTechs([...response.technologies]);
                setPrefs([...response.project_preferences]);
                response["members"] = teamData.members;
                setTeamData(response)
                closeModal()
            })
        }


        return (<div className="modal-container">
            <div className="form-text">
                Editar Equipo
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
                                    return tech_tag(value)
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
                                    return pref_tag(value)
                                })}
                            </div>
                        </div>
                    </label>
                </div>
            </form>
            <div className="container-button-modal">
                <button className="cancel-edit-button-style" onClick={closeModal}>
                    Cancelar
                </button>
                <button className="save-edit-button-style" onClick={updateTeamButton}>
                    Guardar
                </button>
            </div>
        </div>)
    }

    const addMembersModal = () => {

        const sendMemberInvitation = (uid) => {
            const body = {
                "sender_id": context.user.uid,
                "receiver_id": uid,
                "tid": teamData.tid
            }
            sendInvitation(body).then((r) => {
                console.log(r)
            }).catch()
        }
        const memberView = (data) => {
            if (membersList.includes(data.uid)) {
                return
            }

            const user_link = "/user/" + data.uid


            if (data.name.toLowerCase().includes(search.toLowerCase()) || data.lastname.toLowerCase().includes(search.toLowerCase()) || data.email.toLowerCase().includes(search.toLowerCase())) {
                return (
                    <div className="add-member">
                        <div key={data} className="member">
                            <div className="member-photo">
                                <User color="#FAFAFA" size="24px" variant="Bold"/>
                            </div>
                            <div className="member-name" onClick={() => {
                                navigate(user_link)
                            }}>
                                {data.name} {data.lastname}
                                <div className="email">
                                    {data.email}
                                </div>
                            </div>
                        </div>
                        <div className="add-user">
                            <AddCircle size="24" color="#B1B1B1" onClick={() => {
                                sendMemberInvitation(data.uid)
                            }}/>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="modal-container">
                <div className="form-text">
                    Agregar Miembro
                </div>
                <div className="search-member-input">
                    <input type="text" value={search}
                           className="search-input-text"
                           onChange={setSearchHandler}/>
                    <SearchNormal1 className="search-icon" color="#B1B1B1" variant="Outline" size={20}/>
                </div>
                <div className="memberDiv">
                    {users.map((data) => {
                        return memberView(data)
                    })}
                </div>
            </div>
        )
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                {isEditData ? editTeam() : addMembersModal()}
            </Modal>
        )
    }

    if (teamData.tid === undefined) {
        return (
            <NotFound/>
        )
    } else {
        return (
            <div className="team-screen">
                <div className="team-container">
                    {cover()}
                </div>
                <div className="profile-data-container">
                    {members()}
                </div>
                {modal()}
                <SearchBar/>
                <SideBar/>
            </div>
        )
    }
}

const modalStyle = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        fontFamily: "Inter",
        padding: '0',
        borderWidth: 0,
        borderRadius: '10px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: "0px 4px 10px #666666",
    },
};
