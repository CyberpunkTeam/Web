import {useContext, useState} from "react";
import {createUserWithEmailAndPassword } from "firebase/auth";
import {Eye, EyeSlash} from "iconsax-react";
import {Link, useNavigate} from "react-router-dom";

import './style.css';
import pana from "../../assests/pana.svg";
import Logo from "../../components/logo";
import AppContext from "../../utils/AppContext";
import {createUser} from "../../services/userService";

function MainScreen() {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const [register, setRegister] = useState(false);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const setEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const setPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const setNameHandler = (event) => {
        setName(event.target.value);
    }

    const setLastNameHandler = (event) => {
        setLastName(event.target.value);
    }
    const setCityHandler = (event) => {
        setCity(event.target.value);
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const registerButton = () => {

        createUserWithEmailAndPassword(context.auth, email, password)
            .then(async (userCredential) => {
                const userLogin = {
                    'name': name,
                    "lastname": lastName,
                    "email": email,
                    "location": city,
                    "uid": userCredential.user.uid,
                    "token": userCredential.user.accessToken
                }
                await createUser(userLogin)
                context.setUser(userLogin);
                localStorage.setItem("user", JSON.stringify(userLogin))
                navigate('/me')
                console.log(userCredential.user);
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });

    }


    const emailData = () => {
        return (
            <>
                <div className="label">
                    <label>
                        Email:
                        <div className="form-input">
                            <input type="text" value={email} className="input" onChange={setEmailHandler}/>
                        </div>
                    </label>
                </div>
                <div className="label">
                    <label>
                        Password:
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

    const userData = () => {
        return (
            <>
                <div className="label">
                    <label>
                        Nombre:
                        <div className="form-input">
                            <input type="text" value={name} className="input" onChange={setNameHandler}/>
                        </div>
                    </label>
                </div>
                <div className="label">
                    <label>
                        Apellido:
                        <div className="form-input">
                            <input type="text" value={lastName} className="input" onChange={setLastNameHandler}/>
                        </div>
                    </label>
                </div>
                <div className="label">
                    <label>
                        Ciudad:
                        <div className="form-input">
                            <input type="text" value={city} className="input" onChange={setCityHandler}/>
                        </div>
                    </label>
                </div>

            </>
        )
    }

    const loginButton = () => {
        if (!register) {
            return (
                <div className="container-button-login">
                    ¿Ya tienes una cuenta?
                    <Link to="/login" className="login">
                        Inicia Sesión
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="container-button-login"/>
            )
        }
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
                    <div className="form-text">
                        {register ? "Completa tus datos para poder continuar" : "Únete y forma parte de nuestra comunidad"}
                    </div>
                    <form className="form">
                        {register ? userData() : emailData()}
                    </form>
                    <div className="button-container">
                        <button className="button-style" onClick={() => {
                            if (!register) {
                                setRegister(true);
                            } else {
                                return registerButton();
                            }

                        }}>
                            {register ? "Finalizar" : "Únirse"}
                        </button>
                        {loginButton()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainScreen;
