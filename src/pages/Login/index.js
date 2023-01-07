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

function Login() {
    const [searchParams, setSearchParams] = useSearchParams();
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
    const [errorMessage, setErrorMessage] = useState("Usuario no encontrado");
    const setEmailHandler = (event) => {
        setEmail(event.target.value);
        setUserError(false);
    }

    const setPasswordHandler = (event) => {
        setPassword(event.target.value);
        setPasswordError(false);
        setUserError(false);
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const userNotFoundMessage = () => {
        if (passwordError) {
            return (
                <div className="login-message-error-list">
                    <ul>
                        <li>Una Mayúscula</li>
                        <li>Una Minúscula</li>
                        <li>Un Número</li>
                        <li>Al menos 8 caracteres</li>
                    </ul>
                </div>
            )
        }

        return (
            <div className="login-user-not-found">
                {userError ? errorMessage : ""}
            </div>
        )
    }

    const changePassword = () => {
        if (email.length === 0 || password.length === 0) {
            setUserError(true);
            setErrorMessage("Completar los campos requeridos")
            return
        }

        const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if (!regularExpression.test(password)) {
            setPasswordError(true);
            return;
        }

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
                setErrorMessage("La solicitud para restablecer tu contraseña caducó o ya se usó el vínculo")
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
            setErrorMessage("se produjo un error inesperado, intente más tarde")
            setButtonDisabled(false)
        });
    }

    const loginButton = () => {
        if (email.length === 0 || password.length === 0) {
            setUserError(true);
            setErrorMessage("Completar los campos requeridos")
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
                    setErrorMessage("Contraseña incorrecta")
                } else if (error.code.includes("auth/user-not-found")) {
                    setErrorMessage("Usuario no encontrado")
                } else {
                    setErrorMessage("Hubo un error con su usuario")
                }
                setUserError(true);
                setButtonDisabled(false)
            });
    }

    const joinButton = () => {
        if (!emailRegister) {
            return (
                <div className="container-button-login">
                    ¿No tienes una cuenta?
                    <Link to="/" className="login">
                        Únete ahora
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
                    <Link to="/recovery" className="forgot">
                        ¿Has olvidado tu contraseña?
                    </Link>
                </div>
            )
        }
    }

    const loginForm = () => {
        return (
            <div className="form-container">
                <div className="form-text">
                    {recoveryPasswordMode ? "Recuperar Cuenta" : "Iniciar Sesión"}
                </div>
                <form className="form">
                    <div className="label">
                        <label>
                            Email
                            <div className="form-input">
                                <input type="text" value={email} disabled={emailRegister} className="input"
                                       onChange={setEmailHandler}/>
                            </div>
                        </label>
                    </div>
                    <div className="label">
                        <label>
                            Password
                            <div className="form-input">
                                <input type={passwordShown ? "text" : "password"} value={password}
                                       className="input"
                                       onChange={setPasswordHandler}/>
                                {passwordShown ?
                                    <Eye className="password-button" color="#B1B1B1" variant="Outline" size={20}
                                         onClick={togglePassword}/> :
                                    <EyeSlash className="password-button" color="#B1B1B1" variant="Outline"
                                              size={20}
                                              onClick={togglePassword}/>}
                            </div>
                        </label>
                        {recoveryPasswordButton()}
                    </div>
                    {userNotFoundMessage()}
                </form>
                <div className="button-container">
                    <button disabled={buttonDisabled}
                            className={buttonDisabled ? "button-style-disabled" : "button-style"}
                            onClick={recoveryPasswordMode ? changePassword :
                                loginButton}>
                        {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        {buttonDisabled ? "" : recoveryPasswordMode ? "Recuperar" : "Iniciar Sesión"}
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


    if (recoveryPasswordMode === "resetPassword") {
        window.location.replace(`https://findmyteam-369403.firebaseapp.com/__/auth/action?mode=resetPassword&oobCode=${searchParams.get("oobCode")}&apiKey=${searchParams.get("apiKey")}&lang=es-419`);
    } else {
        return (
            <div className="container">
                <Logo/>
                <div className="data-container">
                    {completeData ? registerForm() : loginForm()}
                </div>
            </div>
        );
    }
}

export default Login;
