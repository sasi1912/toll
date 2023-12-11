import React, { Component } from "react";
import { Map, GoogleApiWrapper, Polyline, Marker } from "google-maps-react";
import { encode, decode } from "@googlemaps/polyline-codec";
import From from "./From";

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: "Default Origin",
      destination: "Default Destination",
      originCoords: null,
      destinationCoords: null,
      polyline: null,
    };
  }

  handleLocationChange = async (origin, destination) => {
    try {
      const originCoords = await this.getCoordinates(origin);
      const destinationCoords = await this.getCoordinates(destination);

      const polyline = encode([
        [originCoords.lat, originCoords.lng],
        [destinationCoords.lat, destinationCoords.lng],
      ]);

      const decodedPolyline = decode(polyline);

      console.log("Origin Coordinates:", originCoords);
      console.log("Destination Coordinates:", destinationCoords);
      console.log("Generated Polyline:", decodedPolyline);

      this.setState({
        origin,
        destination,
        originCoords,
        destinationCoords,
        polyline: decodedPolyline,
      });
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      alert("Error fetching coordinates. Please try again.");
    }
  };

  getCoordinates = async (place) => {
    // ... (same as before)
    const apiKey = "AIzaSyBTmTb9fWVdc8h_m1zxaGkCLp4E-WUukP0";
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      place
    )}&key=${apiKey}`;

    try {
      const response = await fetch(geocodingUrl);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        throw new Error("No coordinates found for the specified place.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw error; // rethrow the error to propagate it to the calling code
    }
  };

  render() {
    const { google } = this.props;
    const { originCoords, destinationCoords, polyline } = this.state;

    return (
      <div className="Map">
        <div className="form">
          <From onLocationChange={this.handleLocationChange} />
        </div>
        <div className="map">
          <Map
            google={google}
            style={{
              width: "60vw",
              height: "81vh",
              marginLeft: "5vw",
              borderRadius: "8px",
              marginTop: "10px",
            }}
            zoom={5}
            initialCenter={{
              lat: 14.6677168333905,
              lng: 77.58115852621808,
            }}
          >
            {/* Display the polyline on the map */}
            {polyline && polyline.length > 0 && (
              <Polyline
                path={polyline}
                strokeColor="#0000FF"
                strokeOpacity={1}
                strokeWeight={2}
              />
            )}

            {/* Markers for origin and destination */}
            {originCoords && (
              <Marker
                position={{ lat: originCoords.lat, lng: originCoords.lng }}
              />
            )}
            {destinationCoords && (
              <Marker
                position={{
                  lat: destinationCoords.lat,
                  lng: destinationCoords.lng,
                }}
              />
            )}
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBTmTb9fWVdc8h_m1zxaGkCLp4E-WUukP0",
})(MapContainer);
