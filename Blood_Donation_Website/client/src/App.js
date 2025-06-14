import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import DonorRegistrationPage from "./components/DonorRegistrationPage";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Article from "./components/Article";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/donate" element={<DonorRegistrationPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/article" element={<Article />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
