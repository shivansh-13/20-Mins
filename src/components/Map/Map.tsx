import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});

function LocationMarker() {
  const map = useMap();
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setUserLocation(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  return userLocation === null ? null : (
    <Marker position={userLocation} icon={customIcon}>
      <Popup>You are here!</Popup>
    </Marker>
  );
}

export default function Map() {
  return (
    <MapContainer
      className="min-w-full min-h-screen -z-10"
      center={[0, 0]}
      zoom={18}
      scrollWheelZoom={false}
      style={{ position: "relative" }}
      zoomControl={false} // Disable the default zoom control
    >
      <TileLayer
        maxZoom={18}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      <div className="leaflet-bottom leaflet-right">
        <div className="leaflet-control-zoom leaflet-bar leaflet-control">
          <a
            className="leaflet-control-zoom-in"
            href="#"
            title="Zoom in"
            role="button"
            onClick={() => {
              mapRef.current.leafletElement.zoomIn();
            }}
          >
            +
          </a>
          <a
            className="leaflet-control-zoom-out"
            href="#"
            title="Zoom out"
            role="button"
            onClick={() => {
              mapRef.current.leafletElement.zoomOut();
            }}
          >
            -
          </a>
        </div>
      </div>
    </MapContainer>
  );
}
