import {useNavigate, useParams} from "react-router-dom";
import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {updateUser} from "../../services/userService";

export default function EditProfileModal(params) {
    let context = useContext(AppContext);
    const navigate = useNavigate();

    const [name, setName] = useState(context.user.name);
    const [lastname, setLastName] = useState(context.user.lastname);
    const [city, setCity] = useState(context.user.location);

    const setNameHandler = (event) => {
        setName(event.target.value);
    }

    const setLastnameHandler = (event) => {
        setLastName(event.target.value);
    }

    const setCityHandler = (event) => {
        setCity(event.target.value);
    }

    const updateProfileButton = () => {
        const body = {
            name: name,
            lastname: lastname,
            location: city
        }

        updateUser(context.user.uid, body).then((response) => {
            setName(response.name);
            setLastName(response.lastname);
            setCity(response.location);
            context.setUser(response);
            params.closeModal();
        })
    }

    return (<div className="modal-container">
        <div className="form-text">
            Editar Perfil
        </div>
        <form className="modal-form">
            <label className="label">
                Nombre
                <div className="modal-form-input">
                    <input type="text" value={name} className="input" onChange={setNameHandler}/>
                </div>
            </label>
            <label className="label">
                Apellido
                <div className="modal-form-input">
                    <input type="text" value={lastname} className="input" onChange={setLastnameHandler}/>
                </div>
            </label>
            <label className="label">
                Ubicación
                <div className="modal-form-input">
                    <input type="text" value={city} className="input" onChange={setCityHandler}/>
                </div>
            </label>
        </form>
        <div className="container-button-modal">
            <button className="save-edit-button-style" onClick={updateProfileButton}>
                Guardar
            </button>
        </div>
    </div>)

}
