import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import WorkInProgress from "./pages/work_in_progress";
import MainScreen from "./pages/MainScreen";
import Login from "./pages/Login";
import ProfileScreen from "./pages/ProfileScreen";
import NotFound from "./pages/NotFound";
import AppContext from "./utils/AppContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
    const userStorage = localStorage.getItem("user")
    const [user, setUser] = useState(userStorage !== undefined ? JSON.parse(userStorage) : undefined);
    const data = {
        user,
        setUser
    }

    return (
        <AppContext.Provider value={data}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={<WorkInProgress/>}/>
                            <Route path="main" element={<MainScreen/>}/>
                            <Route path="login" element={<Login/>}/>
                            <Route path="me" element={<ProfileScreen/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </AppContext.Provider>
    )
}

root.render(<App/>);
