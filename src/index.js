import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {firebaseConfig} from "./config/firebaseConfig";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {isMobile} from 'react-device-detect';

import MainScreen from "./pages/MainScreen";
import Login from "./pages/Login";
import ProfileScreen from "./pages/ProfileScreen";
import NotFound from "./pages/NotFound";
import AppContext from "./utils/AppContext";
import TeamScreen from "./pages/Team";
import ProjectsScreen from "./pages/Projects";
import CreateProjectScreen from "./pages/CreateProject";
import ProjectScreen from "./pages/Project";
import SearchResults from "./pages/searchResults";
import RecoveryPassword from "./pages/RecoveryPassword";
import EditProfile from "./pages/EditProfile";
import ReviewScreen from "./pages/ReviewScreen";

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const userStorage = localStorage.getItem("user")

    const [user, setUser] = useState(userStorage !== undefined ? JSON.parse(userStorage) : undefined);
    const [search, setSearch] = useState(undefined);
    const [size, setSize] = useState(undefined);

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    const handleResize = () => {
        if (window.innerWidth < 960) {
            setSize(true)
        } else {
            setSize(false)
        }
    }

    const data = {
        user,
        setUser,
        search,
        setSearch,
        auth,
        size,
        app
    }

    const ifUserLogs = () => {
        if (user !== null) {
            return (
                <>
                    <Route path="me" element={<ProfileScreen/>}/>
                    <Route path="/user/:id" element={<ProfileScreen/>}/>
                    <Route path="/team/:id" element={<TeamScreen/>}/>
                    <Route path="/projects" element={<ProjectsScreen/>}/>
                    <Route path="/projects/:id" element={<ProjectScreen/>}/>
                    <Route path="/projects/:id/edit" element={<CreateProjectScreen/>}/>
                    <Route path="/projects/new" element={<CreateProjectScreen/>}/>
                    <Route path="/search" element={<SearchResults/>}/>
                    <Route path="/review" element={<ReviewScreen/>}/>
                </>
            )
        }
    }

    const ifUserLogsMobile = () => {
        if (isMobile) {
            return (
                <>
                    <Route path="/user/edit" element={<EditProfile/>}/>
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
                            <Route index element={<MainScreen/>}/>
                            <Route path="login" element={<Login/>}/>
                            <Route path="recovery" element={<RecoveryPassword/>}/>
                            {ifUserLogs()}
                            {ifUserLogsMobile()}
                            <Route path="*" element={<NotFound/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </AppContext.Provider>
    )
}

root.render(<App/>);
