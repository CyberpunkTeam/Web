import './style.css';
import {SearchNormal1} from "iconsax-react";
import {useState} from "react";

export default function SearchBar() {
    const [search, setSearch] = useState()

    const setSearchHandler = (event) => {
        setSearch(event.target.value);
    }


    return (
        <div className="searchbar">
            <div className="search-input">
                <input type="text" value={search}
                       className="search-input-text"
                       onChange={setSearchHandler}/>
                <SearchNormal1 className="search-icon" color="#B1B1B1" variant="Outline" size={20}/>
            </div>
        </div>
    )

}
