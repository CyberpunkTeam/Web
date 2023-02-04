import './style.css';
import SideBar from "../../components/SideBar";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/loading";
import {useContext, useEffect, useState} from "react";
import {getTeam, getTeamReviews} from "../../services/teamService";
import {Edit, Star1, User, UserCirlceAdd} from "iconsax-react";
import AppContext from "../../utils/AppContext";
import SearchBar from "../../components/SearchBar";
import NotFound from "../NotFound";
import Modal from "react-modal";
import {getUsers} from "../../services/userService";
import TeamModal from "../../components/TeamModal";
import AddMemberModal from "../../components/AddMemberModal";
import TeamInvitation from "../../components/TeamInvitation";
import {getTeamInvitations} from "../../services/invitationService";
import {getTeamPostulations} from "../../services/projectService";
import TeamProjectPostulations from "../../components/TeamProjectPostulations";
import TechnologyTag from "../../components/TechnologyTag";
import PreferenceTag from "../../components/PreferenceTag";
import {isMobile} from "react-device-detect";
import MembersPostulations from "../../components/MembersPostulations";
import TeamInformationView from "../../components/TeamInformationView";

export default function TeamScreen() {
    const params = useParams();
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isEditData, setIsEditData] = useState(false);
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [invitations, setInvitations] = useState([]);
    const [membersList, setMembersList] = useState([]);
    const [teamData, setTeamData] = useState(undefined)
    const [loading, setLoading] = useState(true);
    const [postulations, setPostulations] = useState([])
    const [tagSelect, setTagSelect] = useState("info")
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        getTeam(params.id).then((response) => {
            setTeamData(response);
            getTeamReviews(params.id).then((reviews) => {
                setReviews(reviews)
                const list = []
                response.members.forEach((data) => {
                    list.push(data.uid)
                })
                setMembersList(list)
                getUsers().then((users) => {
                    setUsers(users)
                })
                getTeamInvitations(params.id).then((invitations) => {
                    if (invitations.length !== 0) {
                        const usersInvited = []
                        invitations.forEach((data) => {
                            if (data.state === "PENDING") {
                                usersInvited.push(data.metadata.user.uid)
                            }
                        })
                        setInvitations(usersInvited);
                    }
                    getTeamPostulations(params.id).then((response) => {
                        setPostulations(response)
                        setLoading(false);
                    })
                })
            })
        }).catch((error) => {
            console.log(error)
            navigate("/*")
        });
    }, [params.id, navigate, time]);

    useEffect(() => {
        if (!loading) {
            const interval = setInterval(() => setTime(Date.now()), 10000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [loading]);

    const closeModal = () => {
        setIsOpen(false);
        setIsEditData(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    if (loading) {
        return <Loading/>
    }

    const IMAGE = 'https://scopeblog.stanford.edu/wp-content/uploads/2020/08/chris-ried-ieic5Tq8YMk-unsplash-1024x684.jpg'

    const editButton = () => {
        if (teamData.owner === context.user.uid) {

            return (
                <div className="cover-buttons">
                    <div className="edit-button" onClick={() => {
                        setIsEditData(true)
                        setIsOpen(true);
                    }
                    }>
                        <Edit size="24" color="#014751"/>
                    </div>
                </div>
            )
        }
    }
    const cover = () => {
        return (
            <div className="cover-container">
                <div className="team-data-container">
                    <div className="team-name">
                        {teamData.name}
                        <div className="team-rating">
                            <Star1 size="24" color="#ECA95A" variant="Linear" className={"star"}/>
                            {teamData.overall_rating.toFixed(1)}
                        </div>
                    </div>
                    <div className="tags-container">
                        {teamData.technologies.map((data) => {
                            return <TechnologyTag key={data} technology={data}/>
                        })}
                    </div>
                    <div className="tags-container">
                        {teamData.project_preferences.map((data) => {
                            return <PreferenceTag key={data} preference={data}/>
                        })}
                    </div>
                    {editButton()}
                </div>
                <img src={IMAGE} className="image-container" alt=""/>
            </div>
        )
    }

    const member = (data) => {
        const userNavigate = () => {
            const user_link = data.uid === context.user.uid ? '/me' : '/user/' + data.uid;
            navigate(user_link);
        }

        const user_image = (data) => {
            if (data.profile_image === "default") {
                return (
                    <div className="member-photo">
                        <User color="#FAFAFA" size="16px" variant="Bold"/>
                    </div>
                )
            } else {
                return <img src={data.profile_image} alt='' className="user-sidebar"/>
            }
        }

        return (
            <div key={data.uid} className="members-info-container">
                <div className="members-info">
                    {user_image(data)}
                    <div className="member-name" onClick={userNavigate}>
                        {data.name} {data.lastname}
                        <div className="owner">
                            {data.uid === teamData.owner ? 'Owner' : ''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const modal = () => {
        return (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} ariaHideApp={false}>
                {isEditData ? <TeamModal team={teamData} setTeamData={setTeamData} closeModal={closeModal}/> :
                    <AddMemberModal members={membersList} tid={teamData.tid} users={users} invitations={invitations}
                                    setInvitations={setInvitations} closeModal={closeModal}/>}
            </Modal>
        )
    }

    const addButton = () => {
        if (context.user.uid === teamData.owner) {
            return (
                <button className="addMemberButton" onClick={openModal}>
                    <UserCirlceAdd color="#FAFAFA" variant="Bold" size={40}/>
                </button>
            )
        }
    }

    const tagsInfo = () => {
        if (tagSelect === "projects") {
            return <TeamProjectPostulations postulations={postulations}/>
        }

        if (tagSelect === "members") {
            return <MembersPostulations owner={teamData.owner} tid={teamData.tid} members={membersList}/>
        }

        if (tagSelect === "info") {
            return <TeamInformationView postulations={postulations} reviews={reviews}/>
        }

    }

    const postulationsTag = () => {
        if (context.user.uid === teamData.owner) {
            return (
                <div className={tagSelect === "projects" ? "tagSelectorSelect" : "tagSelector"}
                     onClick={() => {
                         setTagSelect("projects")
                     }}>
                    Project Postulations
                </div>
            )
        }
    }

    const membersTag = () => {
        if (context.user.uid === teamData.owner) {
            return (
                <div className={tagSelect === "members" ? "tagSelectorSelect" : "tagSelector"}
                     onClick={() => {
                         setTagSelect("members")
                     }}>
                    Member Postulations
                </div>
            )
        }

        if (!membersList.includes(context.user.uid)) {
            return (
                <div className={tagSelect === "members" ? "tagSelectorSelect" : "tagSelector"}
                     onClick={() => {
                         setTagSelect("members")
                     }}>
                    Opportunities
                </div>
            )
        }
    }


    if (teamData.tid === undefined) {
        return (
            <NotFound/>
        )
    } else {
        return (
            <div className={isMobile ? "profile-screen-mobile" : "team-screen"}>
                <div className="team-container">
                    <TeamInvitation tid={teamData.tid} owner={teamData.members[0]}/>
                    {cover()}
                </div>
                <div className="profile-data-container">
                    {addButton()}
                    <div className="members-container">
                        {teamData.members.map((data) => {
                                return member(data)
                            }
                        )}
                    </div>
                </div>
                <div className="tagsFilterContainer">
                    <div className={tagSelect === "info" ? "tagSelectorSelect" : "tagSelector"} onClick={() => {
                        setTagSelect("info")
                    }}>
                        Information
                    </div>
                    {membersTag()}
                    {postulationsTag()}
                </div>
                {tagsInfo()}
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
        borderRadius: '16px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: "0px 4px 10px #666666",
    },
};
