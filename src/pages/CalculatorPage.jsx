import { useState } from "react";
import ApplianceForm from "../components/ApplianceForm";
import ResultCard from "../components/ResultCard";

export default function CalculatorPage() {
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleResult = (data) => {
    setResult(data);
    setShowResult(true);
  };

  const closeResult = () => {
    setShowResult(false);
  };

  return (
    <div className="calculator-page">
      <section className="calculator-hero">
        <div>
          <span>Home solar sizing</span>
          <h1>Get a solar recommendation from your appliances</h1>
          <p>
            Pick the appliances you use, adjust their power and usage, then get
            inverter, battery, panel, and cost estimates.
          </p>
        </div>
      </section>

      <ApplianceForm onResult={handleResult} />
      {showResult && <ResultCard data={result} onClose={closeResult} />}
    </div>
  );
}
