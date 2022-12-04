import './style.css';
import Logo from "../../components/logo";
import notFound from "../../assests/404.svg"

function NotFound() {
    return (
        <div className="not-found-container">
            <Logo/>
            <div className="not-found-image-container">
                <text className="not-found-message">
                    Lo sentimos, no pudimos
                </text>
                <text className="not-found-message">
                    encontrar lo que buscas :(
                </text>
                <img src={notFound} className={"not-found-image"}/>
            </div>
        </div>
    );
}

export default NotFound;
