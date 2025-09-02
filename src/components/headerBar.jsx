import LanguageSelect from "./languageSelect";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const HeaderBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const isConfig = location.pathname.endsWith("/configurations");

    return(
        <div className="header-bar">
            <LanguageSelect />
            {!isConfig && (
                <img 
                    alt="config icon" 
                    onClick={() => navigate('/configurations')} 
                    src="https://img.icons8.com/?size=100&id=2969&format=png&color=F7FAB0"
                />
            )}
            {isConfig && (
                <img class="menu-icon"
                    alt="menu icon" 
                    onClick={() => navigate('/menu')} 
                    src='assets/menu-icon.png'
                />
            )}
        </div>
    );
}

export default HeaderBar;