import './style.css';
import SideBar from "../../components/SideBar";
import AppContext from "../../utils/AppContext";
import {useContext, useEffect, useState} from "react";
import NotFound from "../NotFound";
import {AddCircle, Edit, LampCharge, People, Star1, User} from "iconsax-react";
import Modal from 'react-modal';
import {Link, useNavigate, useParams} from "react-router-dom";
import {createTeam} from "../../services/teamService";
import {getProfile, updateUser} from "../../services/userService";
import Loading from "../../components/loading";
import SearchBar from "../../components/SearchBar";

function ProfileScreen() {
    const params = useParams();
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState(context.user.name);
    const [lastname, setLastName] = useState(context.user.lastname);
    const [city, setCity] = useState(context.user.location);

    const [teamName, setTeamName] = useState("");
    const [tech, setTech] = useState("");
    const [techs, setTechs] = useState([]);
    const [prefs, setPrefs] = useState([]);
    const [pref, setPref] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isCreateTeamModal, setIsCreateTeamModal] = useState(false);
    const [isProjectModal, setIsProjectModal] = useState(false);
    const [isEditProfile, setIsEditProfile] = useState(false);
    const id = params.id ? params.id : context.user.uid

    const [userData, setUserData] = useState({})

    useEffect(() => {
        getProfile(id).then((response) => {
            setUserData(response);
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        });
    }, [id]);

    const user_image = () => {
        if (context.user.image === undefined) {
            return (
                <div className="user-svg">
                    <User color="#FAFAFA" size="50px" variant="Bold"/>
                </div>
            )
        } else {
            return <img src={image} alt={'user'} className="user"/>
        }
    }

    const user_data = () => {
        return (
            <div className="user-data-container">
                <div className="name">
                    {id !== context.user.uid ? userData.user.name : context.user.name} {id !== context.user.uid ? userData.user.lastname : context.user.lastname}
                </div>
                <div className="extra-data">
                    {id !== context.user.uid ? userData.user.location : context.user.location}
                </div>
                <div className="extra-data">
                    {id !== context.user.uid ? userData.user.email : context.user.email}
                </div>
            </div>
        )
    }

    const team_user_view = () => {
        const viewMore = () => {
            return (
                <div className="view-more" onClick={() => {
                    viewTeams()
                }}>
                    Ver más (+{userData.teams.length - 1})
                </div>
            )
        }

        const teamView = () => {
            if (userData.teams.length === 0) {
                return;
            }

            const team_link = "/team/" + userData.teams[0].tid;

            return (
                <div className="data-info">
                    <Link to={team_link} className="team-link">
                        {userData.teams[0].name}
                    </Link>
                    <div className="rank">
                        <Star1 size="16" color="#2E9999" variant="Bold" className={"icon"}/>
                        5.0
                    </div>
                </div>
            )
        }

        return (
            <div className="user-info-container">
                {id !== context.user.uid ? null :
                    <AddCircle size="24" color="#B1B1B1" className="add-button" onClick={() => {
                        createTeamOpenModal()
                    }}/>}
                <div className="user-info">
                    <div className="data-title">
                        <People size="32" color="#014751" className={"icon"}/>
                        Equipos
                    </div>
                    {teamView()}
                    {userData.teams.length > 1 ? viewMore() : null}
                </div>
            </div>
        )
    }

    const user_projects_view = () => {
        const viewMore = () => {
            return (
                <div className="view-more" onClick={watchProjectsModal}>
                    Ver más (+{userData.projects.length - 1})
                </div>
            )
        }

        const projectView = () => {
            if (userData.projects.length === 0) {
                return;
            }

            const projects_link = "/projects/" + userData.projects[0].pid;
            console.log(userData.projects[0])

            return (
                <div className="data-info">
                    <Link to={projects_link} className="team-link">
                        {userData.projects[0].name}
                    </Link>
                    <div className="tags-project">
                        {userData.projects[0].technologies.map((data) => {
                            return tech_tag(data)
                        })}
                        {userData.projects[0].idioms.map((data) => {
                            return pref_tag(data)
                        })}
                    </div>
                </div>
            )
        }

        return (
            <div className="user-info-container">
                {id !== context.user.uid ? null :
                    <AddCircle size="24" color="#B1B1B1" className="add-button" onClick={() => {
                        navigate("/projects/new")
                    }}/>}
                <div className="user-info">
                    <div className="data-title">
                        <LampCharge size="32" color="#014751" className={"icon"}/>
                        Proyectos
                    </div>
                    {projectView()}
                    {userData.projects.length > 1 ? viewMore() : null}
                </div>
            </div>
        )
    }

    const setNameHandler = (event) => {
        setName(event.target.value);
    }

    const setLastnameHandler = (event) => {
        setLastName(event.target.value);
    }

    const setCityHandler = (event) => {
        setCity(event.target.value);
    }

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

    const createTeamOpenModal = () => {
        setIsCreateTeamModal(true)
        setIsOpen(true);
    }

    const watchProjectsModal = () => {
        setIsProjectModal(true)
        setIsOpen(true);
    }

    const viewTeams = () => {
        setIsCreateTeamModal(false)
        setIsOpen(true);
    }

    const closeModal = () => {
        setTechs([]);
        setPrefs([]);
        setTech("");
        setPref("");
        setName(context.user.name);
        setLastName(context.user.lastname);
        setCity(context.user.location);
        setIsEditProfile(false);
        setIsCreateTeamModal(false);
        setIsProjectModal(false);
        setTeamName("")
        setIsOpen(false);
    }

    const createTeamButton = () => {
        const body = {
            name: teamName,
            technologies: techs,
            project_preferences: prefs,
            owner: context.user.uid
        }

        createTeam(body).then((response) => {
            closeModal();
            navigate("/team/" + response.tid)
        })

    }

    const updateProfileButton = () => {
        const body = {
            name: name,
            lastname: lastname,
            location: city
        }

        updateUser(context.user.uid, body).then((response) => {
            closeModal()
            setName(response.name);
            setLastName(response.lastname);
            setCity(response.location);
            context.setUser(response)
        })

    }

    const createTeamView = () => {
        return (<div className="modal-container">
            <div className="form-text">
                Crea un nuevo equipo
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
                <button className="modal-button-style" onClick={() => {
                    createTeamButton()
                }}>
                    Listo
                </button>
            </div>
        </div>)
    }

    const editProfile = () => {
        return (<div className="modal-container">
            <div className="form-text">
                Editar Perfil
            </div>
            <form className="modal-form">
                <label className="label">
                    Nombre
                    <div className="modal-form-input">
                        <input type="text" value={name} className="input" onChange={setNameHandler}/>
                    </div>
                </label>
                <label className="label">
                    Apellido
                    <div className="modal-form-input">
                        <input type="text" value={lastname} className="input" onChange={setLastnameHandler}/>
                    </div>
                </label>
                <label className="label">
                    Ubicación
                    <div className="modal-form-input">
                        <input type="text" value={city} className="input" onChange={setCityHandler}/>
                    </div>
                </label>
            </form>
            <div className="container-button-modal">
                <button className="cancel-edit-button-style" onClick={closeModal}>
                    Cancelar
                </button>
                <button className="save-edit-button-style" onClick={updateProfileButton}>
                    Guardar
                </button>
            </div>
        </div>)
    }

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

    const viewProjectsModal = () => {

        const teamView = (data) => {
            const team_link = "/projects/" + data.pid
            return (
                <div className="team-data-info">
                    <Link to={team_link} className="team-link-teams-view">
                        {data.name}
                    </Link>
                    <div className="line">
                        <div className="tags-modal">
                            {data.technologies.map((data) => {
                                return tech_tag(data)
                            })}
                        </div>
                        <div className="tags-modal">
                            {data.idioms.map((data) => {
                                return pref_tag(data)
                            })}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="modal-container">
                <div className="form-text">
                    Proyectos
                </div>
                <div className="scrollDiv">
                    {userData.projects.map((data) => {
                        return teamView(data)
                    })}
                </div>
            </div>
        )
    }

    const viewTeamsModal = () => {

        const teamView = (data) => {
            const team_link = "/team/" + data.tid
            return (
                <div className="team-data-info">
                    <Link to={team_link} className="team-link-teams-view">
                        {data.name}
                    </Link>
                    <div className="rank-team-view">
                        <Star1 size="16" color="#2E9999" variant="Bold" className={"icon"}/>
                        5.0
                    </div>
                    <div className="line">
                        <div className="tags-modal">
                            {data.technologies.map((data) => {
                                return tech_tag(data)
                            })}
                        </div>
                        <div className="tags-modal">
                            {data.project_preferences.map((data) => {
                                return pref_tag(data)
                            })}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="modal-container">
                <div className="form-text">
                    Equipos
                </div>
                <div className="scrollDiv">
                    {userData.teams.map((data) => {
                        return teamView(data)
                    })}
                </div>
            </div>
        )
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                {isCreateTeamModal ? createTeamView() : isEditProfile ? editProfile() : isProjectModal ? viewProjectsModal() : viewTeamsModal()}
            </Modal>
        )
    }

    const image = "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    const image_cover = 'https://images.unsplash.com/photo-1445363692815-ebcd599f7621?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'

    const cover = () => {
        const editButton = () => {
            if (id === context.user.uid) {
                return (
                    <div className="edit-button" onClick={() => {
                        setIsEditProfile(true);
                        setIsOpen(true);
                    }
                    }>
                        <Edit size="24" color="#014751"/>
                    </div>
                )
            }
        }

        return (
            <div className="cover-container">
                <div className="user-cover-container">
                    <div className="user-data">
                        {user_image()}
                        {user_data()}
                    </div>
                    {editButton()}
                </div>
                <img src={image_cover} className="image-container" alt=""/>
            </div>
        )
    }

    if (loading) {
        return <Loading/>
    }

    if (context.user === undefined || context.user === null) {
        return (
            <NotFound/>
        )
    } else {
        return (
            <div className="profile-screen">
                <div className="profile-container">
                    {cover()}
                </div>
                <div className="profile-data-container">
                    <div className="column">
                        {team_user_view()}
                        {user_projects_view()}
                    </div>
                    <div className="column">
                    </div>
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

export default ProfileScreen;
