import React, { useState, useEffect } from "react";

const HerbalRemedies = () => {
  const [remediesData, setRemediesData] = useState({});
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false); // Track if search has been made

  // Load remedies from JSON file
  useEffect(() => {
    fetch("/Symptoms.json") // Ensure the file is in the public folder
      .then((response) => response.json())
      .then((data) => setRemediesData(data))
      .catch((error) => console.error("Error loading dataset:", error));
  }, []);

  // Function to find remedies
  const findRemedies = () => {
    setSearched(true);
    const symptoms = input.toLowerCase().split(",").map((s) => s.trim());
    const matchedRemedies = [];

    for (let remedy in remediesData) {
      const remedyInfo = remediesData[remedy];
      if (!remedyInfo.treats) continue;

      const matchedSymptoms = symptoms.filter((s) => remedyInfo.treats.includes(s));

      if (matchedSymptoms.length > 0) {
        matchedRemedies.push({
          name: remedy,
          ingredients: remedyInfo.ingredients || [],
          benefits: remedyInfo.benefits || "No benefits listed.",
          matches: matchedSymptoms.length,
        });
      }
    }

    setResults(matchedRemedies);
  };

  return (
    <div className="container">
      <h1>🌿 Herbal Remedies Finder</h1>
      <p>Enter symptoms to find natural remedies.</p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter symptoms (e.g., cough, sore throat)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={findRemedies}>🔍 Search</button>
      </div>

      <div id="result">
        {searched && results.length === 0 ? (
          <p className="no-results">⚠️ No matching remedies found. Try different symptoms.</p>
        ) : (
          <div className="remedy-list">
            {results.map((remedy, index) => (
              <div key={index} className="remedy-card">
                <h3>{remedy.name}</h3>
                <p><strong>🧪 Ingredients:</strong> {remedy.ingredients.join(", ")}</p>
                <p><strong>🌱 Benefits:</strong> {remedy.benefits}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CSS Styles */}
      <style>
        {`
          .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          h1 {
            color: #2d572c;
            margin-bottom: 10px;
          }

          .search-box {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
          }

          input {
            flex: 1;
            padding: 10px;
            border: 2px solid #2d572c;
            border-radius: 5px;
            font-size: 16px;
          }

          button {
            padding: 10px 20px;
            background: #2d572c;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: 0.3s;
          }

          button:hover {
            background: #3b7d3c;
          }

          .no-results {
            color: #b00020;
            font-size: 16px;
            margin-top: 20px;
          }

          .remedy-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .remedy-card {
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            text-align: left;
          }

          .remedy-card h3 {
            color: #2d572c;
            margin-bottom: 5px;
          }

          .remedy-card p {
            margin: 5px 0;
            font-size: 19px;
          }

          @media (max-width: 600px) {
            .container {
              width: 90%;
            }

            .search-box {
              flex-direction: column;
              gap: 5px;
            }

            input {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default HerbalRemedies;