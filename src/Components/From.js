import React, { useState } from "react";
import { ImLocation } from "react-icons/im";
import "./Components.css";

const From = ({ onLocationChange }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleChange = (e, locationType) => {
    const value = e.target.value;
    if (locationType === "origin") {
      setOrigin(value);
    } else if (locationType === "destination") {
      setDestination(value);
    }
  };

  const handleSubmit = () => {
    // Call the parent component's function to handle the changes
    onLocationChange(origin, destination);
  };

  return (
    <>
      <div className="place">
        <ImLocation id="search-icon" />
        <input
          className="from-input"
          type="location"
          placeholder="Origin..."
          value={origin}
          onChange={(e) => handleChange(e, "origin")}
        />
      </div>
      <div className="place">
        <ImLocation id="search-icon" />
        <input
          className="destination-input"
          type="location"
          placeholder="Destination..."
          value={destination}
          onChange={(e) => handleChange(e, "destination")}
        />
      </div>
      <div className="vehicles">
        <div className="select-vehicle">
          <h5>Select your vehicle:</h5>
          <select id="vehicle-options">
            <option value="">Car, Jeep, Van, SUV</option>
            <option value="">Taxi</option>
            <option value="">Pickup truck, Light Commercial</option>
            <option value="">Truck</option>
            <option value="">Bus</option>
            <option value="">Motorcycle</option>
            <option value="">HCM, EME</option>
          </select>
        </div>
      </div>
      <div className="FuelInfo">
        <button id="fuel-info" type="form">
          Additional Fuel Info
        </button>
        <form id="fuel-efficiency">
          <input type="number" placeholder="City" />
          <input type="number" placeholder="Highway" />
          <input type="number" placeholder="Fuel Price" />
        </form>
      </div>
      <div className="Date">
        <h5>Departure Time:</h5>
        <input type="datetime-local" id="date" />
      </div>
      <div>
        <button type="submit" id="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default From;
