import {useContext, useState} from "react";
import {createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import {Eye, EyeSlash} from "iconsax-react";
import {Link} from "react-router-dom";

import './style.css';
import pana from "../../assests/pana.svg";
import Logo from "../../components/logo";
import AppContext from "../../utils/AppContext";

function MainScreen() {
    let context = useContext(AppContext);

    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("El email ya se encuentra registado");

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
        if (loginError)
            return (
                <div className="login-message-error">
                    {errorMessage}
                </div>
            )
    }


    const registerButton = () => {
        console.log("Apretado")
        if (email.length === 0 || password.length === 0) {
            setLoginError(true);
            setErrorMessage("Completar los campos requeridos")
            return
        }

        setLoading(true);
        createUserWithEmailAndPassword(context.auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
                console.log(context.auth.currentUser)
                sendEmailVerification(context.auth.currentUser).then((r) => {
                    console.log(r)
                    setRegister(true)
                    window.localStorage.setItem('emailForSignIn', email);
                })
            })
            .catch((error) => {
                if (error.code.includes("invalid-email")) {
                    setErrorMessage("El mail es invalido")
                } else {
                    setErrorMessage("El email ya se encuentra registado")
                }
                setLoginError(true);
                console.log(error.code);
                console.log(error.message);
            });
        setLoading(false);
    }


    const emailData = () => {
        return (
            <>
                <div className="label">
                    <label>
                        Email
                        <div className="form-input">
                            <input type="text" value={email} className="input" onChange={setEmailHandler}/>
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
                </div>
            </>
        )
    }

    const loginButton = () => {
        return (
            <div className="container-button-login">
                ¿Ya tienes una cuenta?
                <Link to="/login" className="login">
                    Inicia Sesión
                </Link>
            </div>
        )
    }

    const verifyMessage = () => {
        return (
            <div className="verify-message">
                <div className="form-text">
                    Verifica tu cuenta
                </div>
                <div className="verify-text">
                    <div>
                        Enviamos un correo a <b>{email}</b>,
                    </div>
                    por favor veríficalo para continuar
                </div>
            </div>
        )
    }

    const registerForm = () => {
        return (
            <>
                <div className="form-text">
                    Únete y forma parte de nuestra comunidad
                </div>
                <form className="form">
                    {emailData()}
                </form>
                {loginErrorView()}
                <div className="button-container">
                    <button disabled={loginError || loading} className={loading ? "loading-style" : "button-style"}
                            onClick={() => {
                                registerButton();
                            }}>
                        Unirse
                    </button>
                    {loginButton()}
                </div>
            </>
        )
    }

    return (
        <div className="container">
            <Logo/>
            <div className="container-login">
                <div className="pana-container">
                    <div className="title-style">
                        Encuentra tu equipo ideal de manera sencilla y rápida
                    </div>
                    <img src={pana} className="pana-style" alt="logo"/>
                </div>
                <div className="form-container">
                    {register ? verifyMessage() : registerForm()}
                </div>
            </div>
        </div>
    );
}

export default MainScreen;
