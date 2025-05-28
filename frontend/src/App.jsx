import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Standings from "./pages/Standings";
import Predictor from "./pages/Predictor";
import Playoff from "./pages/Playoff";

function App() {
  return (
    <div className="flex flex-col mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Standings />} />
        <Route path="/predictor" element={<Predictor />} />
        <Route path="/playoff" element={<Playoff />} />
      </Routes>
    </div>
  );
}

export default App;
