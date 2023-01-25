import './style.css';
import Logo from "../../components/logo";
import notFound from "../../assests/404.svg"

function NotFound() {
    return (
        <div className="not-found-container">
            <Logo/>
            <div className="not-found-image-container">
                <div className="not-found-message">
                    Sorry, We couldn't find
                </div>
                <div className="not-found-message">
                    you're looking for :(
                </div>
                <img src={notFound} className={"not-found-image"} alt={""}/>
            </div>
        </div>
    );
}

export default NotFound;
