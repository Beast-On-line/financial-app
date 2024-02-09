import "./App.css";
import SipCalculator from "./components/SipCalculator";
import Lumpsum from "./components/LumpSum";
import EmiCalculator from "./components/EmiCalculator";
import IncomeTax from "./components/IncomeTax";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SipCalculator />} />
          <Route path="/emicalculator" element={<EmiCalculator />} />
          <Route path="/lumpsum" element={<Lumpsum />} />
          <Route path="/incometax" element={<IncomeTax />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
