import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

import AppContext from "../../utils/AppContext";
import {createUser} from "../../services/userService";
import {isMobile} from "react-device-detect";

function Register(params) {
    let context = useContext(AppContext);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
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

    const registerButton = () => {
        if (name.length === 0 || lastName.length === 0 || city.length === 0) {
            setErrorMessage("Complete the required fields")
            return
        }
        setButtonDisabled(true);

        const userLogin = {
            'name': name,
            "lastname": lastName,
            "email": params.email,
            "location": city,
            "uid": params.uid
        }
        createUser(userLogin).then((r) => {
            context.setUser(userLogin);
            localStorage.setItem("user", JSON.stringify(r))
            setButtonDisabled(false);
            navigate('/me')
        }).catch((error) => {
            setLoginError(true);
            setErrorMessage("se produjo un error inesperado, intente más tarde")
            console.log(error.code);
            console.log(error.message);
            setButtonDisabled(false);
        });

    }

    const userData = () => {
        return (
            <>
                <div className={isMobile ? "label-mobile" : "label"}>
                    <label>
                        Name
                        <input type="text"
                               value={name}
                               className={isMobile ? "input-mobile" : "input"}
                               onChange={setNameHandler}/>
                    </label>
                </div>
                <div className={isMobile ? "label-mobile" : "label"}>
                    <label>
                        Surname
                        <input type="text"
                               value={lastName}
                               className={isMobile ? "input-mobile" : "input"}
                               onChange={setLastNameHandler}/>
                    </label>
                </div>
                <div className={isMobile ? "label-mobile" : "label"}>
                    <label>
                        Location
                        <input type="text"
                               value={city}
                               className={isMobile ? "input-mobile" : "input"}
                               onChange={setCityHandler}/>
                    </label>
                </div>
            </>
        )
    }

    return (
        <div className={isMobile ? "form-container-mobile" : "form-container"}>
            <div className={isMobile ? "form-text-mobile" : "form-text"}>
                Complete your personal information
            </div>
            <form className={isMobile ? "form-mobile" : "form"}>
                {userData()}
            </form>
            {loginErrorView()}
            <div className="button-container">
                <button disabled={buttonDisabled}
                        className={buttonDisabled ? isMobile ? "button-style-disabled-mobile" : "button-style-disabled" : isMobile ? "button-style-mobile" : "button-style"}
                        onClick={registerButton}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Complete"}
                </button>
            </div>
        </div>
    );
}

export default Register;
