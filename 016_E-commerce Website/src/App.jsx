import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Footer from "./Footer";


const App = () => {
  return(
    <> 
      <div className="flex flex-col min-h-screen">
        <div className="bg-slate-900 fixed w-full z-10">
          <Navbar />
        </div>

        <div className="flex-1 pt-16"> {/* pt-16 to offset fixed navbar height */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default App;
