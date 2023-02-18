import "./style.css"

import {useContext, useState} from "react";
import AppContext from "../../utils/AppContext";
import {updateUser} from "../../services/userService";
import {CloseCircle, GalleryImport, User} from "iconsax-react";
import {savePhoto} from "../../services/firebaseStorage";
import {isMobile} from "react-device-detect";
import Select from "react-select";
import {selectedCities, selectedCitiesMobile} from "../../styles/commonStyles";
import {searchCity} from "../../services/searchService";

export default function EditProfileModal(params) {
    let context = useContext(AppContext);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [profileImg, setProfileImg] = useState(context.user.profile_image);
    const [coverImg, setCoverImg] = useState(context.user.cover_image);
    const [name, setName] = useState(context.user.name);
    const [lastname, setLastName] = useState(context.user.lastname);
    const [city, setCity] = useState(context.user.location);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const updateProfileButton = async () => {
        setButtonDisabled(true)
        const body = {
            name: name,
            lastname: lastname,
            location: city
        }

        if (profileImg !== context.user.profile_image) {
            const photo_url = await savePhoto(context.app, profileImg, context.user.uid + "-profile");
            body["profile_image"] = photo_url
            setProfileImg(photo_url)
        }

        if (coverImg !== context.user.cover_image) {
            const photo_url = await savePhoto(context.app, coverImg, context.user.uid + "-cover");
            body["cover_image"] = photo_url
            setCoverImg(photo_url);
        }

        updateUser(context.user.uid, body).then((response) => {
            context.setUser(response);
            localStorage.setItem("user", JSON.stringify(response))
            setButtonDisabled(false)
            params.closeModal()
        })
    }

    const profileImage = () => {

        const image = () => {
            if (profileImg === undefined || profileImg === "default") {
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
            if (coverImg === undefined || coverImg === "default") {
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

    const profileImageMobile = () => {

        const image = () => {
            if (profileImg === undefined || profileImg === "default") {
                return (
                    <div className="user-svg-mobile">
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

            return <img src={url} alt={'user'} className="user-svg-mobile"/>

        }

        const coverImage = () => {
            if (coverImg === undefined || coverImg === "default") {
                return (
                    <div className="cover-user-container-mobile"/>
                )
            }

            let url;
            try {
                url = URL.createObjectURL(coverImg);
            } catch (e) {
                url = coverImg;
            }

            return <img src={url} className="image-container-mobile" alt=""/>
        }


        return (
            <div className="profile-container-edit">
                <div className="user-cover-edit-container-mobile">
                    <label className="custom-file-upload-mobile">
                        <input type="file" onChange={handleChange}/>
                        <GalleryImport size="48" color="#014751"/>
                    </label>
                    {image()}
                </div>
                <label className="custom-cover-file-upload-mobile">
                    <input type="file" onChange={handleCoverChange}/>
                    <GalleryImport size="48" color="#014751"/>
                </label>
                {coverImage()}
            </div>
        )
    }

    if (isMobile) {
        return (
            <div className={"profile-container"}>
                {profileImageMobile()}
                <form className="edit-form-mobile">
                    <label className="label-mobile">
                        Name
                        <div className="modal-form-input">
                            <input type="text" value={name} className="input-mobile" onChange={setNameHandler}/>
                        </div>
                    </label>
                    <label className="label-mobile">
                        Surname
                        <div className="modal-form-input">
                            <input type="text" value={lastname} className="input-mobile" onChange={setLastnameHandler}/>
                        </div>
                    </label>
                    <label className={"label-mobile"}>
                        Location
                        <div className="modal-form-input-select">
                            <Select
                                defaultValue={[{value: city, label: city}]}
                                isClearable
                                isLoading={loading}
                                onSelectResetsInput={false}
                                onInputChange={ (newValue) => setSearchHandler(newValue)}
                                options={cities}
                                onChange={(choice) => setCitySearchHandler(choice)}
                                styles={selectedCitiesMobile}
                            />
                        </div>
                    </label>
                </form>
                <div className="container-button-mobile">
                    <button className="cancel-edit-button-mobile-style" onClick={params.closeModal}>
                        Back
                    </button>
                    <button disabled={buttonDisabled}
                            className={buttonDisabled ? "button-style-disabled-mobile" : "button-style-mobile"}
                            onClick={updateProfileButton}>
                        {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        {buttonDisabled ? "" : "Save"}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="modal-container">
            <div className="form-text-modal">
                Edit Profile
            </div>
            {profileImage()}
            <form className="modal-form">
                <label className="label">
                    Name
                    <div className="modal-form-input">
                        <input type="text" value={name} className="input" onChange={setNameHandler}/>
                    </div>
                </label>
                <label className="label">
                    Surname
                    <div className="modal-form-input">
                        <input type="text" value={lastname} className="input" onChange={setLastnameHandler}/>
                    </div>
                </label>
                <label className={" "}>
                    Location
                    <div className="modal-form-input-select">
                        <Select
                            defaultValue={[{value: city, label: city}]}
                            isClearable
                            isLoading={loading}
                            onSelectResetsInput={false}
                            onInputChange={ (newValue) => setSearchHandler(newValue)}
                            options={cities}
                            onChange={(choice) => setCitySearchHandler(choice)}
                            styles={selectedCities}
                        />
                    </div>
                </label>
            </form>
            <div className="container-button-modal">
                <button className="cancel-edit-button-style" onClick={params.closeModal}>
                    Cancel
                </button>
                <button disabled={buttonDisabled}
                        className={buttonDisabled ? "save-edit-button-style-disabled" : "save-edit-button-style"}
                        onClick={updateProfileButton}>
                    {buttonDisabled ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                    {buttonDisabled ? "" : "Save"}
                </button>
            </div>
            <CloseCircle size="24" color="#B1B1B1" className="add-button" onClick={params.closeModal}/>
        </div>
    )
}
