import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import AboutPage from "./pages/About";

function App() {


  return (
    <>
      <BrowserRouter>

        <Navbar />
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      
      </BrowserRouter>    
    </>
  )
}

export default App
