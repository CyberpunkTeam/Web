import './style.css';
import SideBar from "../../components/SideBar";
import AppContext from "../../utils/AppContext";
import {useContext, useState} from "react";
import NotFound from "../NotFound";
import {AddCircle, People, Star1, User} from "iconsax-react";
import Modal from 'react-modal';

function ProfileScreen() {
    let context = useContext(AppContext);

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
                <text className="name">
                    {context.user.name} {context.user.lastname}
                </text>
                <text className="extra-data">
                    {context.user.location}
                </text>
                <text className="extra-data">
                    {context.user.email}
                </text>
            </div>
        )
    }

    const team_user_view = () => {
        return (
            <div className="user-info-container">
                <AddCircle size="24" color="#B1B1B1" className="add-button" onClick={() => {
                    openModal()
                }}/>
                <div className="user-info">
                    <div className="data-title">
                        <People size="32" color="#014751" className={"icon"}/>
                        Teams
                    </div>
                    <div className="data-info">
                        Equipo Alfa
                        <div className="rank">
                            <Star1 size="24" color="#2E9999" variant="Bold" className={"icon"}/>
                            5.0
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const [teamName, setTeamName] = useState("");
    const [tech, setTech] = useState("");
    const [techs, setTechs] = useState([]);
    const [prefs, setPrefs] = useState([]);
    const [pref, setPref] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);

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


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setTechs([])
        setPrefs([])
        setTech("")
        setPref("")
        setTeamName("")
        setIsOpen(false);
    }

    const tag = (value) => {
        return(
            <div id={value} className={"modal-tag"}>
                {value}
            </div>
        )
    }

    const modal_create_team = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle}>
                <div className="modal-container">
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
                                    <input type="text" value={tech} className="input" onChange={setTechHandler} onKeyUp={addTechTag}/>
                                    <div className="modal-tags-container">
                                        {techs.map((value) => {return tag(value)})}
                                    </div>
                                </div>
                            </label>
                            <label>
                                Preferencias de Proyecto
                                <div className="modal-form-input-with-tags">
                                    <input type="text" value={pref} className="input" onChange={setPrefHandler} onKeyUp={addPrefsTag}/>
                                    <div className="modal-tags-container">
                                        {prefs.map((value) => {return tag(value)})}
                                    </div>
                                </div>
                            </label>
                        </div>
                    </form>
                    <div className="container-button-modal">
                        <button className="modal-button-style" onClick={() => {
                            closeModal()
                        }}>
                            Listo
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }


    const image = "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    const image_cover = 'https://images.unsplash.com/photo-1445363692815-ebcd599f7621?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'

    const cover = () => {
        return (
            <div className="cover-container">
                <div className="user-cover-container">
                    <div className="user-data">
                        {user_image()}
                        {user_data()}
                    </div>
                </div>
                <img src={image_cover} className="image-container" alt=""/>
            </div>
        )
    }

    if (context.user === undefined || context.user === null) {
        return (
            <NotFound/>
        )
    } else {
        return (
            <div className="profile-screen">
                <SideBar/>
                <div className="profile-container">
                    {cover()}
                </div>
                <div className="profile-data-container">
                    {team_user_view()}
                </div>
                {modal_create_team()}
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
