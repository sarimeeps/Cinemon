import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Navbar from "./components/navbar/Navbar";

function App() {


  return (
    <>
      <BrowserRouter>

        <Navbar />
      
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      
      </BrowserRouter>    
    </>
  )
}

export default App
