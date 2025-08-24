import logo from './logo.svg';
import './App.css';
import { LanguageProvider } from './components/LanguageProvider';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from './pages/menu';

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <Router className="container">
          <Routes>
            <Route path="/menu" element={<Menu></Menu>}></Route>
            <Route path="/" element={<Menu></Menu>}></Route>
          </Routes>
        </Router>
      </LanguageProvider>
    </div>
  );
}

export default App;
