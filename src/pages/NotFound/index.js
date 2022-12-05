import './style.css';
import Logo from "../../components/logo";
import notFound from "../../assests/404.svg"

function NotFound() {
    return (
        <div className="not-found-container">
            <Logo/>
            <div className="not-found-image-container">
                <div className="not-found-message">
                    Lo sentimos, no pudimos
                </div>
                <text className="not-found-message">
                    encontrar lo que buscas :(
                </text>
                <img src={notFound} className={"not-found-image"} alt={""}/>
            </div>
        </div>
    );
}

export default NotFound;
