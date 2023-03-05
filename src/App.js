import React, { useState, useEffect } from "react";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary/index";
import { getCountries, getReportByCountry } from "./apis";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      setCountries(res?.data);
      setSelectedCountryId("vn");
    });
  }, []);

  useEffect(() => {
    if (selectedCountryId) {
      const value = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountryId
      );

      getReportByCountry(value?.Slug).then((res) => {
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [countries, selectedCountryId]);

  const handleOnChanges = (e) => {
    setSelectedCountryId(e.target.value);
  };

  return (
    <div className="App">
      <CountrySelector
        countries={countries}
        handleOnChanges={handleOnChanges}
        value={selectedCountryId}
      />
      <Highlight report={report} />
      <Summary report={report} />
    </div>
  );
}

export default App;
