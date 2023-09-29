import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconMarker from "leaflet/dist/images/marker-icon.png"
import iconMarkerTx from "leaflet/dist/images/marker-icon-2x.png"
import iconMarkerShadow from "leaflet/dist/images/marker-shadow.png"

const customIcon = new L.Icon({
  iconUrl: iconMarker.src,
  iconRetinaUrl: iconMarkerTx.src,
  shadowUrl: iconMarkerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});

function LocationMarker() {
  const map = useMap();
  const [userLocation, setUserLocation] = useState<L.LatLng>();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setUserLocation(e.latlng);
      localStorage.setItem("lat",  JSON.stringify([e.latlng.lat ,e.latlng.lng]));
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);
  return userLocation === null ? null : (
    <Marker position={userLocation ?? [0,0]} icon={customIcon}>
      <Popup>You are here!</Popup>
    </Marker>
  );
}

export default function Map() {
  return (
    <MapContainer
      className="min-w-full min-h-screen z-0"
      center={[15, 15]}
      zoom={15}
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
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
