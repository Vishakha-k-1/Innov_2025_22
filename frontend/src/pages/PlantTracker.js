import React, { useState, useEffect } from "react";

const PlantTracker = () => {
  const [plantName, setPlantName] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [plantGrowthData, setPlantGrowthData] = useState({});
  const [timeline, setTimeline] = useState([]);
  const [plantOptions, setPlantOptions] = useState([]); // Store plant names for dropdown

  // Load JSON data when component mounts
  useEffect(() => {
    fetch("/TimeLine.json")
      .then((response) => response.json())
      .then((data) => {
        setPlantGrowthData(data);
        setPlantOptions(Object.keys(data)); // Extract plant names for dropdown
      })
      .catch((error) => console.error("Error loading plant data:", error));
  }, []);

  const showTimeline = () => {
    if (!plantingDate) {
      alert("Please select a planting date.");
      return;
    }

    const plantData = plantGrowthData[plantName];
    if (!plantData) {
      alert("No growth data available for this plant.");
      return;
    }

    const startDate = new Date(plantingDate);
    const newTimeline = Object.entries(plantData).map(([stage, daysToAdd]) => {
      let phaseDate = new Date(startDate);
      phaseDate.setDate(startDate.getDate() + daysToAdd);
      return { stage, date: phaseDate.toDateString() };
    });

    setTimeline(newTimeline);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🌿 Plant Growth Tracker</h1>

      {/* Input Fields */}
      <div style={styles.inputContainer}>
        <label style={styles.label}>Select Plant:</label>
        <select
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
          style={styles.input}
        >
          <option value="" disabled>
            Choose a plant
          </option>
          {plantOptions.map((plant) => (
            <option key={plant} value={plant}>
              {plant}
            </option>
          ))}
        </select>

        <label style={styles.label}>Planting Date:</label>
        <input
          type="date"
          value={plantingDate}
          onChange={(e) => setPlantingDate(e.target.value)}
          style={styles.input}
        />

        <button onClick={showTimeline} style={styles.button}>
          Show Growth Timeline
        </button>
      </div>

      {/* Timeline Display */}
      {timeline.length > 0 && (
        <div style={styles.timelineContainer}>
          <h2 style={styles.subHeading}>🌱 Growth Timeline</h2>
          <ul style={styles.timelineList}>
            {timeline.map((entry, index) => (
              <li key={index} style={styles.timelineItem}>
                <strong>{entry.stage}:</strong> {entry.date}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ✅ Inline CSS styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
    background: "#E8F5E9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#388E3C",
  },
  input: {
    padding: "10px",
    width: "90%",
    border: "2px solid #388E3C",
    borderRadius: "5px",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    padding: "10px 15px",
    fontSize: "1rem",
    fontWeight: "bold",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  buttonHover: {
    background: "#388E3C",
  },
  timelineContainer: {
    marginTop: "20px",
    padding: "15px",
    background: "#F1F8E9",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  subHeading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2E7D32",
  },
  timelineList: {
    listStyle: "none",
    padding: 0,
    textAlign: "left",
  },
  timelineItem: {
    fontSize: "1rem",
    background: "#C8E6C9",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    fontWeight: "bold",
  },
};

export default PlantTracker;
