import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="history" element={<History />} />
      </Routes>
    </>
  );
}

export default App;
