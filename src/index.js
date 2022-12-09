import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {firebaseConfig} from "./config/firebaseConfig";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

import MainScreen from "./pages/MainScreen";
import Login from "./pages/Login";
import ProfileScreen from "./pages/ProfileScreen";
import NotFound from "./pages/NotFound";
import AppContext from "./utils/AppContext";
import TeamScreen from "./pages/Team";
import Working from "./pages/Working";
import Register from "./pages/Register";

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const userStorage = localStorage.getItem("user")
    const [user, setUser] = useState(userStorage !== undefined ? JSON.parse(userStorage) : undefined);
    const data = {
        user,
        setUser,
        auth
    }
    return (
        <AppContext.Provider value={data}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Working/>}/>
                            <Route path="main" element={<MainScreen/>}/>
                            <Route path="login" element={<Login/>}/>
                            <Route path="me" element={<ProfileScreen/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Route>
                        <Route path="/team">
                            <Route index element={<NotFound/>}/>
                            <Route path=":id" element={<TeamScreen/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </AppContext.Provider>
    )
}

root.render(<App/>);
