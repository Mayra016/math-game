import { createContext, useContext, useState } from "react";
import textEN from '../translations/textEN';
import textES from '../translations/textES';
import textDE from '../translations/textDE';
import textPT from '../translations/textPT';

const LanguageContext = createContext();
const translations = {
    "EN" : textEN,
    "ES" : textES,
    "DE" : textDE,
    "PT" : textPT
};

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(localStorage.getItem("lang") || "EN");


    const translationSource = translations[lang]; 

    const text = (key) => translationSource[key] || key;

    const setLanguage = (key) => {
        setLang(key);

        localStorage.setItem('lang', String(key));
    }

    return (
        <LanguageContext.Provider value={{ lang, text, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useTranslation() {
    return useContext(LanguageContext);
}
