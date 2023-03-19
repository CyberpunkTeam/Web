import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

import AppContext from "../../utils/AppContext";
import {createUser} from "../../services/userService";
import {isMobile} from "react-device-detect";
import Select from "react-select";
import {selectedCities, selectedCitiesMobile} from "../../styles/commonStyles";
import {searchCity} from "../../services/searchService";
import AlertMessage from "../../components/AlertMessage";

function Register(params) {
    let context = useContext(AppContext);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState("El email ya se encuentra registado");
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const errorMessageCreate = "An error occurred while trying to create tue user"

    const setCitySearchHandler = (value) => {
        console.log(value)
        if (value === null) {
            setCity("")
            setCities([])
            return
        }
        setCity(value.value)
    }
    const setSearchHandler = (value) => {
        console.log(value)
        if (value.length >= 3) {
            setLoading(true);
            searchCity(value).then((response) => {
                let list = []
                response.forEach((city) => {
                    list.push({value: city, label: city})
                })
                setCities(list)
                setLoading(false);
            })
        }
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
            if (r === undefined) {
                if (context.errorMessage !== errorMessageCreate) {
                    context.setErrorMessage(errorMessageCreate);
                }
            } else {
                context.setUser(userLogin);
                localStorage.setItem("user", JSON.stringify(r))
                navigate('/me')
            }
            setButtonDisabled(false);
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
                    Location
                    <div className="modal-form-input-select">
                        <Select
                            isClearable
                            isLoading={loading}
                            onSelectResetsInput={false}
                            onInputChange={ (newValue) => setSearchHandler(newValue)}
                            options={cities}
                            onChange={(choice) => setCitySearchHandler(choice)}
                            styles={isMobile ? selectedCitiesMobile : selectedCities}
                        />
                    </div>
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
                    {buttonDisabled ? "" : "Finish"}
                </button>
            </div>
            <AlertMessage/>
        </div>
    );
}

export default Register;
