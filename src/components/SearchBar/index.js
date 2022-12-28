import './style.css';
import {CloseCircle, People, SearchNormal1, User} from "iconsax-react";
import {useContext, useState} from "react";
import {search} from "../../services/searchService";
import {useNavigate} from "react-router-dom";
import AppContext from "../../utils/AppContext";

export default function SearchBar() {
    const navigate = useNavigate();
    let context = useContext(AppContext);
    const [isSearch, setIsSearch] = useState(false)
    const [searchWord, setSearchWord] = useState("")
    const [result, setResult] = useState({})

    const setSearchHandler = (event) => {
        setSearchWord(event.target.value);
        if (event.target.value === "") {
            setResult({})
            setIsSearch(false);
            return
        }
        search(event.target.value).then((response) => {
            console.log(response)
            setResult(response)
            setIsSearch(true);
        })
    }

    const closeSearch = () => {
        setIsSearch(false)
    }

    const openSearch = () => {
        if (searchWord !== "") {
            setIsSearch(true)
        }
    }

    const clearSearch = () => {
        setSearchWord("")
    }

    const memberView = (data) => {
        if (context.user.uid === data.uid) {
            return
        }

        const user_image = (data) => {
            if (data.profile_image === "default") {
                return (
                    <div className="member-photo">
                        <User color="#FAFAFA" size="24px" variant="Bold"/>
                    </div>
                )
            } else {
                return <img src={data.profile_image} alt='' className="member-photo"/>
            }
        }

        const user_link = "/user/" + data.uid

        return (
            <div key={data.uid} className="user-search">
                <div className="user-info-search">
                    {user_image(data)}
                    <div className="user-name-search" onClick={() => {
                        navigate(user_link)
                        closeSearch()
                        clearSearch()
                    }}>
                        {data.name} {data.lastname}
                    </div>
                </div>
            </div>
        )
    }

    const teamView = (data) => {
        const user_link = "/team/" + data.tid

        return (
            <div key={data.uid} className="user-search">
                <div className="user-info-search">
                    <div className="member-photo">
                        <People color="#FAFAFA" size="24px" variant="Bold"/>
                    </div>
                    <div className="user-name-search" onClick={() => {
                        navigate(user_link)
                        closeSearch()
                        clearSearch()
                    }}>
                        {data.name}
                    </div>
                </div>
            </div>
        )
    }

    const searchResults = () => {
        if (searchWord === "" || !isSearch) {
            return
        }

        if (Object.keys(result).length === 0) {
            return
        }


        return (
            <div className="search-result" onBlur={clearSearch}>
                <div className="search-result-container">
                    {result.users.length !== 0 ? "Usuarios" : ""}
                    {result.users.slice(0, 5).map((user) => {
                        return memberView(user)
                    })}
                    <div className="teams-search">
                        {result.teams.length !== 0 ? "Equipos" : ""}
                        {result.teams.slice(0, 5).map((team) => {
                            return teamView(team)
                        })}
                    </div>

                </div>
                <div className="see-more">
                    Ver todo
                </div>
            </div>
        )
    }


    return (
        <div className="searchbar" onFocus={openSearch}>
            {isSearch ? <div onClick={closeSearch} className="all"/> : null}
            {searchResults()}
            <div className="search-input">
                <input type="text" value={searchWord}
                       className="search-input-text"
                       onChange={setSearchHandler}/>
                <SearchNormal1 className="search-icon" color="#B1B1B1" variant="Outline" size={20}/>
                {searchWord !== "" ? <CloseCircle className="clear-icon" color="#B1B1B1" variant="Outline" size={20}
                                                  onClick={clearSearch}/> : null}
            </div>
        </div>
    )

}
