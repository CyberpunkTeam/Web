import "./style.css"

import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {updateUser} from "../../services/userService";
import {GalleryImport, User} from "iconsax-react";
import {savePhoto} from "../../services/firebaseStorage";

export default function EditProfileModal(params) {
    let context = useContext(AppContext);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [profileImg, setProfileImg] = useState(context.user.profile_image);
    const [coverImg, setCoverImg] = useState(context.user.cover_image);
    const [name, setName] = useState(context.user.name);
    const [lastname, setLastName] = useState(context.user.lastname);
    const [city, setCity] = useState(context.user.location);

    function handleChange(e) {
        setProfileImg(e.target.files[0]);
    }

    function handleCoverChange(e) {
        setCoverImg(e.target.files[0]);
    }

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
        setButtonDisabled(true)
        const body = {
            name: name,
            lastname: lastname,
            location: city
        }

        if (profileImg !== context.user.profile_image) {
            savePhoto(context.app, profileImg).then((r) => {
                body["profile_image"] = r
                updateUser(context.user.uid, body).then((response) => {
                    context.setUser(response);
                    setButtonDisabled(false)
                    params.closeModal()
                })
            })
        }

        if (coverImg !== context.user.cover_image) {
            savePhoto(context.app, coverImg).then((r) => {
                body["cover_image"] = r
                updateUser(context.user.uid, body).then((response) => {
                    context.setUser(response);
                    setButtonDisabled(false)
                    params.closeModal()
                })
            })
        }
    }

    const profileImage = () => {

        const image = () => {
            if (profileImg === undefined) {
                return (
                    <div className="user-svg">
                        <User color="#FAFAFA" size="50px" variant="Bold"/>
                    </div>
                )
            }

            let url;
            try {
                url = URL.createObjectURL(profileImg);
            } catch (e) {
                url = profileImg;
            }

            return <img src={url} alt={'user'} className="user-image"/>

        }

        const coverImage = () => {
            if (coverImg === undefined) {
                return (
                    <div className="cover-edit-container"/>
                )
            }

            let url;
            try {
                url = URL.createObjectURL(coverImg);
            } catch (e) {
                url = coverImg;
            }

            return <img src={url} className="image-edit-container" alt=""/>
        }

        const image_cover = 'https://images.unsplash.com/photo-1445363692815-ebcd599f7621?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'

        return (
            <div className="profile-photo-edit">
                <div className="user-cover-edit-container">
                    <label className="custom-file-upload">
                        <input type="file" onChange={handleChange}/>
                        <GalleryImport size="24" color="#014751"/>
                    </label>
                    {image()}
                </div>
                <label className="custom-cover-file-upload">
                    <input type="file" onChange={handleCoverChange}/>
                    <GalleryImport size="24" color="#014751"/>
                </label>
                {coverImage()}
            </div>
        )
    }

    return (
        <div className="modal-container">
            <div className="form-text">
                Editar Perfil
            </div>
            {profileImage()}
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
                <button className="cancel-edit-button-style" onClick={params.closeModal}>
                    Cancelar
                </button>
                <button disabled={buttonDisabled}
                        className={buttonDisabled ? "save-edit-button-style-disabled" : "save-edit-button-style"}
                        onClick={updateProfileButton}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    Guardar
                </button>
            </div>
        </div>)

}
