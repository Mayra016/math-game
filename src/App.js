import logo from './logo.svg';
import './App.css';
import { LanguageProvider } from './components/LanguageProvider';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from './pages/menu';
import Play from './pages/play';
import LanguageSelect from './components/languageSelect';
import HeaderBar from './components/headerBar';

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <HeaderBar></HeaderBar>
        <Router className="container">
          <Routes>
            <Route path="/menu" element={<Menu></Menu>}></Route>
            <Route path="/" element={<Menu></Menu>}></Route>
            <Route path="/play" element={<Play></Play>}></Route>
          </Routes>
        </Router>
      </LanguageProvider>
    </div>
  );
}

export default App;
