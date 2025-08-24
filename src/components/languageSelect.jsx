import React from "react";
import { useTranslation } from "./LanguageProvider";

const LanguageSelect = () => {
    const { lang, setLanguage } = useTranslation();

    return (
        <select id="language-select" value={lang} onChange={(e) => setLanguage(e.target.value)}>
            <option value="PT">🇧🇷</option>
            <option value="EN">🇺🇸</option>
            <option value="DE">🇩🇪</option>
            <option value="ES">🇪🇸</option>
        </select>
    );
};

export default LanguageSelect;