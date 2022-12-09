import {signInWithEmailAndPassword} from "firebase/auth";
import {useContext, useState} from "react";
import {Eye, EyeSlash} from "iconsax-react";
import {Link, useNavigate, useSearchParams} from "react-router-dom";

import './style.css';
import Logo from "../../components/logo";
import AppContext from "../../utils/AppContext";
import {getUser} from "../../services/userService";
import Register from "../Register";

function Login() {
    const [searchParams, setSearchParams] = useSearchParams();
    const emailRegister = searchParams.get("email") !== null
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState(searchParams.get("email"));
    const [uid, setUid] = useState("")
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
        setUserError(false);
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const userNotFoundMessage = () => {
        if (userError)
            return (
                <div className="login-user-not-found">
                    {errorMessage}
                </div>
            )
    }

    const getUserService = (userCredential) => {
        console.log(userCredential)
        getUser(userCredential.user.uid).then((userdata => {

            console.log(userdata)
            if (Object.keys(userdata).length === 0) {
                setUid(userCredential.user.uid);
                setCompleteData(true);
                return
            }

            const userLogin = {
                'name': userdata.name,
                "lastname": userdata.lastname,
                "email": email,
                "location": userdata.location,
                "uid": userCredential.user.uid
            }
            context.setUser(userLogin);
            localStorage.setItem("user", JSON.stringify(userLogin))
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
            console.log(error);
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

                console.log(userCredential.user);
                await getUserService(userCredential);

            })
            .catch((error) => {
                if (error.code.includes("wrong-password")) {
                    setErrorMessage("Contraseña incorrecta")
                } else {
                    setErrorMessage("Usuario no encontrado")
                }
                setUserError(true);

                console.log(error.code);
                console.log(error.message);
            });
        setButtonDisabled(false)
    }

    const joinButton = () => {
        if (!emailRegister) {
            return (
                <div className="container-button-login">
                    ¿No tienes una cuenta?
                    <Link to="/main" className="login">
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

    const loginForm = () => {
        return (
            <div className="form-container">
                <div className="form-text">
                    Iniciar Sesión
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
                    </div>
                    <div className="forgot-container">
                        <Link to="/" className="forgot">
                            ¿Has olvidado tu contraseña?
                        </Link>
                        {userNotFoundMessage()}
                    </div>
                </form>
                <div className="button-container">
                    <button disabled={buttonDisabled} className="button-style" onClick={() => {
                        loginButton()
                    }}>
                        Iniciar Sesión
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
