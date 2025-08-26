import logo from './logo.svg';
import './App.css';
import { LanguageProvider } from './components/LanguageProvider';
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from './pages/menu';
import Play from './pages/play';
import LanguageSelect from './components/languageSelect';
import HeaderBar from './components/headerBar';
import Config from './pages/configuration';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        
        <Router className="container">
          <HeaderBar></HeaderBar>
          <Routes>
            <Route path="/menu" element={<Menu></Menu>}></Route>
            <Route path="/" element={<Menu></Menu>}></Route>
            <Route path="/play" element={<Play></Play>}></Route>
            <Route path="/configurations" element={<Config></Config>}></Route>
          </Routes>
        </Router>
      </LanguageProvider>
    </div>
    
  );
}

export default App;
