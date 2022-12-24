import './style.css';
import SideBar from "../../components/SideBar";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/loading";
import {useContext, useEffect, useState} from "react";
import {getTeam} from "../../services/teamService";
import {AddCircle, Edit, People, User} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import SearchBar from "../../components/SearchBar";
import NotFound from "../NotFound";
import Modal from "react-modal";
import {getUsers} from "../../services/userService";
import TeamModal from "../../components/TeamModal";
import AddMemberModal from "../../components/AddMemberModal";

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

    useEffect(() => {
        getTeam(params.id).then((response) => {
            setTeamData(response)
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
        const user_link = data.uid === teamData.owner ? '/me' : '/users/' + data.uid
        return (
            <div key={data.uid} className="member">
                <div className="member-photo">
                    <User color="#FAFAFA" size="16px" variant="Bold"/>
                </div>
                <div className="member-name" onClick={() => {
                    navigate(user_link)
                }}>
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
                                    console.log(data)
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

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                {isEditData ? <TeamModal team={teamData} closeModal={closeModal} setTeamData={setTeamData}/> : <AddMemberModal members={membersList} tid={teamData.tid} users={users}/>}
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
