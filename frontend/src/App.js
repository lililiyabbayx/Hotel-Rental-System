/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/eachhotel/Hotel";
import Login from "./pages/login/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page*/}
        <Route path="/hotels" element={<List />} />{" "}
        {/* all hotels list down page*/}
        <Route path="/hotels/:id" element={<Hotel />} /> {/* each hotel page*/}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
