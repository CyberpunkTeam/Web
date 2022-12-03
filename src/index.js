import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import WorkInProgress from "./pages/work_in_progress";
import MainScreen from "./pages/MainScreen";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<WorkInProgress/>}/>
                    <Route path="main" element={<MainScreen/>}/>
                    {/* <Route path="*" element={<NoPage />} />*/}
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
);
