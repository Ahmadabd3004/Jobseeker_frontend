import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import DetailPage from "./components/DetailPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default App;
