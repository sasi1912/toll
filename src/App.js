import MapContainer from "./Components/Map";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>India Toll Calculator</h1>
        <h5>
          This calculator helps you to find out the route of your journey and
          total toll prices and fuel prices of your trip.
        </h5>
      </div>
      <MapContainer />
    </div>
  );
}

export default App;
