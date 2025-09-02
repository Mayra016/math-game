import LanguageSelect from "./languageSelect";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import playAudio from "../utils/playAudio";

const HeaderBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const isConfig = location.pathname.endsWith("/configurations");

    function redirect(route) {
        playAudio("pauseAudio");
        navigate(route);
    }

    return(
        <div className="header-bar">
            <LanguageSelect />
            {!isConfig && (
                <img 
                    alt="config icon" 
                    onClick={() => redirect('/configurations')} 
                    src="assets/configIcon.png"
                />
            )}
            {isConfig && (
                <img class="menu-icon"
                    alt="menu icon" 
                    onClick={() => redirect('/')} 
                    src='assets/menu-icon.png'
                />
            )}
        </div>
    );
}

export default HeaderBar;