import {useContext, useState} from "react";
import {createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import {Eye, EyeSlash} from "iconsax-react";
import {Link} from "react-router-dom";

import './style.css';
import pana from "../../assests/pana.svg";
import Logo from "../../components/logo";
import AppContext from "../../utils/AppContext";
import {BrowserView, isMobile, MobileView} from "react-device-detect";

function MainScreen() {
    let context = useContext(AppContext);

    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("The email is already registered");
    const [passwordShown, setPasswordShown] = useState(false);
    const setEmailHandler = (event) => {
        setLoginError(false);
        setEmail(event.target.value);
    }

    const setPasswordHandler = (event) => {
        setLoginError(false);
        setPassword(event.target.value);
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const loginErrorView = () => {
        if (passwordError) {
            return (
                <div className={isMobile ? "login-message-error-list-mobile" : "login-message-error-list"}>
                    The Password must contain:
                    <ul>
                        <li>An Uppercase Letter</li>
                        <li>A Lowercase Letter</li>
                        <li>A Number</li>
                        <li>At least 8 characters</li>
                    </ul>
                </div>
            )
        }

        return (
            <div className={isMobile ? "login-message-error-mobile" : "login-message-error"}>
                {loginError ? errorMessage : ""}
            </div>
        )
    }

    const registerButton = () => {
        if (email.length === 0 || password.length === 0) {
            setLoginError(true);
            setErrorMessage("Complete the required fields")
            return
        }

        const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if (!regularExpression.test(password)) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);

        setLoading(true);
        createUserWithEmailAndPassword(context.auth, email, password)
            .then((userCredential) => {
                sendEmailVerification(context.auth.currentUser).then((r) => {
                    setRegister(true)
                    window.localStorage.setItem('emailForSignIn', email);
                })
            })
            .catch((error) => {
                if (error.code.includes("invalid-email")) {
                    setErrorMessage("The email is invalid")
                } else {
                    setErrorMessage("The email is already registered")
                }
                setLoginError(true);
                console.log(error.code);
                console.log(error.message);
            });
        setLoading(false);
    }

    const keyUp = (event) => {
        if (event.key === "Enter") {
            registerButton()
        }
    }


    const emailData = () => {
        return (
            <>
                <div className={isMobile ? "label-mobile" : "label"}>
                    <label>
                        Email
                        <input type="text" value={email} className={isMobile ? "input-mobile" : "input"}
                               onChange={setEmailHandler}/>
                    </label>
                </div>
                <div className={isMobile ? "label-mobile" : "label"}>
                    <label>
                        Password
                        <div className="form-input">
                            <input type={passwordShown ? "text" : "password"} value={password}
                                   className={isMobile ? "input-mobile" : "input"}
                                   onKeyUp={keyUp}
                                   onChange={setPasswordHandler}/>
                            <div className={isMobile ? "password-button-mobile" : "password-button"}>
                                {passwordShown ?
                                    <Eye color="#B1B1B1"
                                         variant="Outline"
                                         size={isMobile ? 40 : 20}
                                         onClick={togglePassword}/> :
                                    <EyeSlash color="#B1B1B1"
                                              variant="Outline"
                                              size={isMobile ? 40 : 20}
                                              onClick={togglePassword}/>}
                            </div>
                        </div>
                    </label>
                </div>
            </>
        )
    }

    const loginButton = () => {
        return (
            <div className={isMobile ? "container-button-login-mobile" : "container-button-login"}>
                You already have an account?
                <Link to="/login" className={isMobile ? "login-mobile" : "login"}>
                    Sign In
                </Link>
            </div>
        )
    }

    const verifyMessage = () => {
        return (
            <div className="verify-message">
                <div className={isMobile ? "form-text-mobile" : "form-text"}>
                    Verify your account
                </div>
                <div className={isMobile ? "verify-text-mobile" : "verify-text"}>
                    <div>
                        We sent you an email to <b>{email}</b>,
                    </div>
                    please verify your email inbox to continue
                </div>
            </div>
        )
    }

    const registerForm = () => {
        return (
            <>
                <div className={isMobile ? "form-text-mobile" : "form-text"}>
                    Join to be part of our community
                </div>
                <form className={isMobile ? "form-mobile" : "form"}>
                    {emailData()}
                    {loginErrorView()}
                </form>
                <div className="button-container">
                    <button disabled={loginError || loading}
                            className={loading ? isMobile ? "loading-style-mobile" : "loading-style" : isMobile ? "button-style-mobile" : "button-style"}
                            onClick={registerButton}>
                        Join
                    </button>
                    {loginButton()}
                </div>
            </>
        )
    }

    const mobileView = () => {
        return (
            <div>
                <Logo/>
                <div className="mobile-register-container">
                    <div className="title-style-mobile">
                        Find your ideal team easily and quickly
                    </div>
                    <div className="form-container-mobile">
                        {register ? verifyMessage() : registerForm()}
                    </div>
                    <img src={pana} className="pana-style-mobile" alt="logo"/>
                </div>
            </div>
        )
    }

    const browserView = () => {
        return (
            <div className="container">
                <Logo/>
                <div className="container-login">
                    <div className="pana-container">
                        <div className="title-style">
                            Find your ideal team fast and simple
                        </div>
                        <img src={pana} className="pana-style" alt="logo"/>
                    </div>
                    <div className="form-container">
                        {register ? verifyMessage() : registerForm()}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <BrowserView>
                {browserView()}
            </BrowserView>
            <MobileView>
                {mobileView()}
            </MobileView>
        </>
    );
}

export default MainScreen;
