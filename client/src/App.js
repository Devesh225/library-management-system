import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Pricing from "./components/Pricing";
import RegisterOrg from "./components/RegisterOrg";
import RegisterUser from "./components/RegisterUser";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/organisationregister" element={<RegisterOrg />} />
                <Route path="/userregister" element={<RegisterUser />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
