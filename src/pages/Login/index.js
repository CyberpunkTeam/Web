import {signInWithEmailAndPassword} from "firebase/auth";
import {useContext, useState} from "react";
import {Eye, EyeSlash} from "iconsax-react";
import {Link, useNavigate, useSearchParams} from "react-router-dom";

import './style.css';
import Logo from "../../components/logo";
import AppContext from "../../utils/AppContext";
import {getUser} from "../../services/userService";
import Register from "../Register";
import {createToken} from "../../services/authenticationService";
import {updatePassword} from "../../services/recoveryService";
import {isMobile} from "react-device-detect";

function Login() {
    // eslint-disable-next-line
    const [searchParams, _] = useSearchParams();
    const emailRegister = searchParams.get("email") !== null
    const recoveryPasswordMode = searchParams.get("mode") === "resetPassword";
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState(emailRegister ? searchParams.get("email") : "");
    const [uid, setUid] = useState("")
    const [passwordError, setPasswordError] = useState(false);
    const [completeData, setCompleteData] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [userError, setUserError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("User Not Found");
    const setEmailHandler = (event) => {
        setEmail(event.target.value);
        setUserError(false);
    }

    const setPasswordHandler = (event) => {
        setPassword(event.target.value);
        setUserError(false);
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const userNotFoundMessage = () => {
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
                {userError ? errorMessage : ""}
            </div>
        )
    }

    const changePassword = () => {
        if (email.length === 0 || password.length === 0) {
            setUserError(true);
            setErrorMessage("Complete the required fields")
            return
        }

        const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if (!regularExpression.test(password)) {
            setPasswordError(true);
            return;
        }

        setPasswordError(false);
        setButtonDisabled(true)
        const body = {
            "newPassword": password,
            "oobCode": searchParams.get("oobCode")
        }
        updatePassword(body, searchParams.get("apiKey")).then((r) => {
            if (r.status === 200) {
                loginButton()
            } else {
                setUserError(true);
                setErrorMessage("Your request to reset your password has expired or the link has already been used")
            }
        }).finally(() => {
            setButtonDisabled(false)
        })
    }
    const getUserService = (userCredential) => {
        getUser(userCredential.user.uid).then((userdata => {
            if (Object.keys(userdata).length === 0) {
                setUid(userCredential.user.uid);
                setCompleteData(true);
                return
            }
            context.setUser(userdata);
            localStorage.setItem("user", JSON.stringify(userdata))
            navigate('/me')
        })).catch((error) => {
            console.log(error)
            if (error.status === 404) {
                setUid(userCredential.user.uid);
                setCompleteData(true);
                return
            }
            setUserError(true);
            setErrorMessage("An unexpected error occurred, please try again later")
            setButtonDisabled(false)
        });
    }

    const loginButton = () => {
        if (email.length === 0 || password.length === 0) {
            setUserError(true);
            setErrorMessage("Complete the required fields")
            return
        }
        setButtonDisabled(true)
        signInWithEmailAndPassword(context.auth, email, password)
            .then(async (userCredential) => {
                userCredential.user.getIdToken().then((token) => {
                    let body = {"auth_google_token": token, "user_id": userCredential.user.uid}
                    createToken(body).then((authToken) => {
                        localStorage.setItem("auth_token", authToken.token)
                        getUserService(userCredential).then(() => {
                            setButtonDisabled(false)
                        })
                    })
                })
            })
            .catch((error) => {
                if (error.code.includes("wrong-password")) {
                    setErrorMessage("Wrong password")
                } else if (error.code.includes("auth/user-not-found")) {
                    setErrorMessage("User Not Found")
                } else {
                    setErrorMessage("There was an error with your username")
                }
                setUserError(true);
                setButtonDisabled(false)
            });
    }

    const joinButton = () => {
        if (!emailRegister) {
            return (
                <div className={isMobile ? "container-button-login-mobile" : "container-button-login"}>
                    Don't have an account?
                    <Link to="/" className={isMobile ? "login-mobile" : "login"}>
                        Join
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="container-button-login"/>
            )
        }
    }

    const recoveryPasswordButton = () => {
        if (!recoveryPasswordMode) {
            return (
                <div className="forgot-container">
                    <Link to="/recovery" className={isMobile ? "forgot-mobile" : "forgot"}>
                        Forgot Password?
                    </Link>
                </div>
            )
        }
    }

    const keyUp = (event) => {
        if (event.key === "Enter") {
            return recoveryPasswordMode ? changePassword() : loginButton()
        }
    }

    const loginForm = () => {
        return (
            <div className={isMobile ? "form-container-mobile" : "form-container"}>
                <div className={isMobile ? "form-text-mobile" : "form-text"}>
                    {recoveryPasswordMode ? "Recover Account" : "Sign In"}
                </div>
                <form className={isMobile ? "form-mobile" : "form"}>
                    <div className={isMobile ? "label-mobile" : "label"}>
                        <label>
                            Email
                            <input type="text"
                                   value={email}
                                   disabled={emailRegister}
                                   className={isMobile ? "input-mobile" : "input"}
                                   onChange={setEmailHandler}/>
                        </label>
                    </div>
                    <div className={isMobile ? "label-mobile" : "label"}>
                        <label>
                            Password
                            <div className="form-input">
                                <input type={passwordShown ? "text" : "password"}
                                       value={password}
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
                                                  onClick={togglePassword}/>
                                    }
                                </div>
                            </div>
                        </label>
                        {recoveryPasswordButton()}
                    </div>
                    {userNotFoundMessage()}
                </form>
                <div className="button-container">
                    <button disabled={buttonDisabled}
                            className={buttonDisabled ? isMobile ? "button-style-disabled-mobile" : "button-style-disabled" : isMobile ? "button-style-mobile" : "button-style"}
                            onClick={recoveryPasswordMode ? changePassword : loginButton}>
                        {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        {buttonDisabled ? "" : recoveryPasswordMode ? "Recovery" : "Sign In"}
                    </button>
                    {joinButton()}
                </div>
            </div>
        )
    }

    const registerForm = () => {
        return (
            <Register uid={uid} email={email}/>
        )
    }


    return (
        <div className="container">
            <Logo/>
            <div className="data-container">
                {completeData ? registerForm() : loginForm()}
            </div>
        </div>
    );

}

export default Login;
