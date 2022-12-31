import './style.css';
import SideBar from "../../components/SideBar";
import AppContext from "../../utils/AppContext";
import {useContext, useEffect, useState} from "react";
import NotFound from "../NotFound";
import {AddCircle, Edit, LampCharge, People, Star1, User} from "iconsax-react";
import Modal from 'react-modal';
import {Link, useNavigate, useParams} from "react-router-dom";
import {getProfile} from "../../services/userService";
import Loading from "../../components/loading";
import SearchBar from "../../components/SearchBar";
import ProjectsModal from "../../components/ProjectsModal";
import TechnologyTag from "../../components/TechnologyTag";
import PreferenceTag from "../../components/PreferenceTag";
import TeamsModal from "../../components/TeamsModal";
import TeamModal from "../../components/TeamModal";
import EditProfileModal from "../../components/EditProfileModal";

function ProfileScreen() {
    const params = useParams();
    let context = useContext(AppContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

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
    }, [id, context]);

    const user_image = () => {
        if (userData.user.profile_image === "default") {
            return (
                <div className="user-svg">
                    <User color="#FAFAFA" size="50px" variant="Bold"/>
                </div>
            )
        } else {
            return <img src={userData.user.profile_image} alt={'user'} className="user"/>
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

            return (
                <div className="data-info">
                    <Link to={projects_link} className="team-link">
                        {userData.projects[0].name}
                    </Link>
                    <div className="tags-project">
                        {userData.projects[0].technologies.map((data) => {
                            return <TechnologyTag key={data} technology={data}/>
                        })}
                        {userData.projects[0].idioms.map((data) => {
                            return <PreferenceTag key={data} preference={data}/>
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
        setIsEditProfile(false);
        setIsCreateTeamModal(false);
        setIsProjectModal(false);
        setIsOpen(false);
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                {isCreateTeamModal ? <TeamModal/> : isEditProfile ?
                    <EditProfileModal closeModal={closeModal}/> : isProjectModal ?
                        <ProjectsModal projects={userData.projects}/> : <TeamsModal teams={userData.teams}/>}
            </Modal>
        )
    }

    const cover = () => {

        const coverImage = () => {
            if (userData.user.cover_image === "default") {
                return (
                    <div className="cover-user-container"/>
                )
            }
            return <img src={userData.user.cover_image} className="image-container" alt=""/>
        }

        const editButton = () => {
            if (id === context.user.uid) {
                return (
                    <div className="cover-buttons">
                        <div className="edit-button" onClick={() => {
                            setIsEditProfile(true);
                            setIsOpen(true);
                        }
                        }>
                            <Edit size="24" color="#014751"/>
                        </div>
                    </div>
                )
            }
        }

        console.log()

        return (
            <div className="cover-container">
                <div className="user-cover-container">
                    <div className="user-data">
                        {user_image()}
                        {user_data()}
                    </div>
                    {editButton()}
                </div>
                {coverImage()}
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
