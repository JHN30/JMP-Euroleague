import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Standings from "./pages/Standings";
import Predictor from "./pages/Predictor";
import Playoff from "./pages/Playoff";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificatonPage from "./pages/EmailVerificatonPage";

function App() {
  return (
    <div className="flex flex-col mx-auto min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 relative overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Standings />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="verify-email" element={<EmailVerificatonPage />}/>
        <Route path="/predictor" element={<Predictor />} />
        <Route path="/playoff" element={<Playoff />} />
      </Routes>
    </div>
  );
}

export default App;
