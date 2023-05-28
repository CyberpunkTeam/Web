import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {firebaseConfig} from "./config/firebaseConfig";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {isMobile} from 'react-device-detect';

import AppContext from "./utils/AppContext";
import MainScreen from "./pages/MainScreen";
import Login from "./pages/Login";
import ProfileScreen from "./pages/ProfileScreen";
import NotFound from "./pages/NotFound";
import TeamScreen from "./pages/Team";
import ProjectsScreen from "./pages/Projects";
import CreateProjectScreen from "./pages/CreateProject";
import ProjectScreen from "./pages/Project";
import SearchResults from "./pages/searchResults";
import RecoveryPassword from "./pages/RecoveryPassword";
import EditProfile from "./pages/EditProfile";
import ReviewScreen from "./pages/ReviewScreen";
import TeamReview from "./pages/TeamReview";
import CreateVacantScreen from "./pages/CreateVacantScreen";
import CreateTeam from "./pages/CreateTeam";
import SelectTypeProject from "./pages/SelectTypeProject";
import TeamRecommendation from "./pages/TeamRecommendation";
import PostulateTeam from "./pages/PostulateTeam";
import JobsScreen from "./pages/JobsScreen";
import CreateArticles from "./pages/CreateArticles";
import Article from "./pages/Article";
import Home from "./pages/Home";
import ChatScreen from "./pages/ChatScreen";
import {createUserChat} from "./services/firebaseStorage";
import {doc, getFirestore, onSnapshot} from "firebase/firestore";
import Notifications from "./pages/Notifications";
import AlertMessage from "./components/AlertMessage";
import CreateMessage from "./components/CreateMessage";
import LockUser from "./components/LockUser";

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const userStorage = localStorage.getItem("user")

    const [user, setUser] = useState(userStorage !== undefined ? JSON.parse(userStorage) : undefined);
    const [locked, setLocked] = useState(false);
    const [search, setSearch] = useState(undefined);
    const [chats, setChats] = useState(undefined)
    const [size, setSize] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [createMessage, setCreateMessage] = useState(undefined);
    const db = getFirestore()

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "usersChats", user.uid), (docResponse) => {
                const orderChats = Object.entries(docResponse.data())?.sort((a, b) => b[1].date - a[1].date)
                setChats(orderChats)

            });
            return () => {
                unsub()
            }
        }

        user && getChats()

    }, [user])

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    useEffect(() => {
        if (user !== null) {
            createUserChat(user.uid).then()
        }
    })

    const handleResize = () => {
        if (window.innerWidth < 960) {
            setSize(true)
        } else {
            setSize(false)
        }
    }

    const data = {
        locked,
        setLocked,
        user,
        setUser,
        search,
        chats,
        errorMessage,
        createMessage,
        setErrorMessage,
        setCreateMessage,
        setSearch,
        auth,
        size,
        app
    }

    const ifUserLogs = () => {
        if (user !== null) {
            return (
                <>
                    <Route path="/Home" element={<Home/>}/>
                    {/*user*/}
                    <Route path="me" element={<ProfileScreen/>}/>
                    <Route path="/user/:id" element={<ProfileScreen/>}/>
                    <Route path="/opportunities" element={<JobsScreen/>}/>
                    {/*team*/}
                    <Route path="/team/:id" element={<TeamScreen/>}/>
                    <Route path="/team/:id/edit" element={<CreateTeam/>}/>
                    <Route path="/team/new" element={<CreateTeam/>}/>
                    <Route path="/review" element={<ReviewScreen/>}/>
                    <Route path="/team/review/:id" element={<TeamReview/>}/>
                    <Route path="/new/vacant" element={<CreateVacantScreen/>}/>
                    {/*project*/}
                    <Route path="/projects" element={<ProjectsScreen/>}/>
                    <Route path="/projects/:id" element={<ProjectScreen/>}/>
                    <Route path="/projects/:id/teamRecommendation" element={<TeamRecommendation/>}/>
                    <Route path="/projects/:id/edit" element={<CreateProjectScreen/>}/>
                    <Route path="/new/projects/data" element={<CreateProjectScreen/>}/>
                    <Route path="/new/projects/type" element={<SelectTypeProject/>}/>
                    {/*articles*/}
                    <Route path="/new/articles" element={<CreateArticles/>}/>
                    <Route path="/articles/:id" element={<Article/>}/>
                    {/*extra*/}
                    <Route path="/search" element={<SearchResults/>}/>
                    <Route path="/chats" element={<ChatScreen/>}/>
                </>
            )
        }
    }

    const ifUserLogsMobile = () => {
        if (isMobile) {
            return (
                <>
                    <Route path="/user/edit" element={<EditProfile/>}/>
                    <Route path="/projects/:id/postulate" element={<PostulateTeam/>}/>
                    <Route path={"/notifications"} element={<Notifications/>}/>
                </>
            )
        }
    }

    return (
        <AppContext.Provider value={data}>
            <div className={isMobile || size ? "App-mobile" : "App"}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={user ? <Home/> : <MainScreen/>}/>
                            <Route path="login" element={<Login/>}/>
                            <Route path="recovery" element={<RecoveryPassword/>}/>
                            {ifUserLogs()}
                            {ifUserLogsMobile()}
                            <Route path="*" element={<NotFound/>}/>
                        </Route>
                    </Routes>
                    <LockUser/>
                </BrowserRouter>
                <AlertMessage/>
                <CreateMessage/>
            </div>
        </AppContext.Provider>
    )
}

root.render(<App/>);
