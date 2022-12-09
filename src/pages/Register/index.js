import {useContext, useState} from "react";
import {signInWithEmailLink} from "firebase/auth";
import {useNavigate} from "react-router-dom";

import AppContext from "../../utils/AppContext";
import {createUser} from "../../services/userService";

function Register(params) {
    let context = useContext(AppContext);
    console.log(params)

    const navigate = useNavigate();

    const [email, setEmail] = useState(params.email);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("El email ya se encuentra registado");

    const setNameHandler = (event) => {
        setName(event.target.value);
    }

    const setLastNameHandler = (event) => {
        setLastName(event.target.value);
    }
    const setCityHandler = (event) => {
        setCity(event.target.value);
    }

    const loginErrorView = () => {
        if (loginError)
            return (
                <div className="login-message-error">
                    {errorMessage}
                </div>
            )
    }

    console.log(context.auth.currentUser);

    const registerButton = () => {
        if (name.length === 0 || lastName.length === 0 || city.length === 0) {
            setLoginError(true);
            setErrorMessage("Completar los campos requeridos")
            return
        }
        setLoading(true);
        signInWithEmailLink(context.auth, email, window.location.href)
            .then((userCredential) => {
                const userLogin = {
                    'name': name,
                    "lastname": lastName,
                    "email": email,
                    "location": city,
                    "uid": userCredential.user.uid,
                    "token": userCredential.user.accessToken
                }
                createUser(userLogin).then(() => {
                    context.setUser(userLogin);
                    localStorage.setItem("user", JSON.stringify(userLogin))
                    navigate('/me')
                    console.log(userCredential.user);
                }).catch((error) => {
                    setLoginError(true);
                    setErrorMessage("se produjo un error inesperado, intente más tarde")
                    console.log(error.code);
                    console.log(error.message);
                });
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
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

    const userData = () => {
        return (
            <>
                <div className="label">
                    <label>
                        Nombre
                        <div className="form-input">
                            <input type="text" value={name} className="input" onChange={setNameHandler}/>
                        </div>
                    </label>
                </div>
                <div className="label">
                    <label>
                        Apellido
                        <div className="form-input">
                            <input type="text" value={lastName} className="input" onChange={setLastNameHandler}/>
                        </div>
                    </label>
                </div>
                <div className="label">
                    <label>
                        Ciudad
                        <div className="form-input">
                            <input type="text" value={city} className="input" onChange={setCityHandler}/>
                        </div>
                    </label>
                </div>
            </>
        )
    }

    return (
        <div className="form-container">
            <div className="form-text">
                Completa tus datos para poder continuar
            </div>
            <form className="form">
                {userData()}
            </form>
            {loginErrorView()}
            <div className="button-container">
                <button disabled={loginError || loading} className={loading ? "loading-style" : "button-style"}
                        onClick={() => {
                            registerButton();
                        }}>
                    Finalizar
                </button>
            </div>
        </div>
    );
}

export default Register;
