import LanguageSelect from "./languageSelect";
import { redirect } from "../utils/redirect";

const HeaderBar = () => {
    return(
        <div className="header-bar">
            <LanguageSelect></LanguageSelect>
            <img onClick={() => redirect('/configurations')} src="https://img.icons8.com/?size=100&id=2969&format=png&color=F7FAB0"></img>
        </div>
    );
}

export default HeaderBar;