import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from './Components/Address-Book-Form/Form';
import Home from './Components/Address-Book-Home/Home';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
      <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
