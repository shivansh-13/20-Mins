import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, Tooltip } from "react-leaflet";
import { createControlComponent } from "@react-leaflet/core"
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios"
import "leaflet-routing-machine"

import iconMarker from "leaflet/dist/images/marker-icon.png"
import iconMarkerTx from "leaflet/dist/images/marker-icon-2x.png"
import iconMarkerShadow from "leaflet/dist/images/marker-shadow.png"

const customIcon = new L.Icon({
  iconUrl: iconMarker.src,
  iconRetinaUrl: iconMarkerTx.src,
  shadowUrl: iconMarkerShadow.src,
  iconSize: [30, 46],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});

var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function LocationMarker() {
  const map = useMap();
  const [userLocation, setUserLocation] = useState<L.LatLng>();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setUserLocation(e.latlng);
      localStorage.setItem("lat", JSON.stringify([e.latlng.lat, e.latlng.lng]));
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);
  return userLocation === null ? null : (
    <Marker position={userLocation ?? [0,  0]} icon={customIcon}>
      <Tooltip>You are here!</Tooltip>
    </Marker>
  );
}


interface MapProps {
  data: any
  mode?: boolean
}

const Map: React.FC<MapProps> = ({ data, mode }) => {
  const [route, setRoute] = useState([]);
  const mapRef = useRef<L.Map>(null);
  const [startLoc, setStartLoc] = useState(JSON.parse(localStorage.getItem('lat') ?? "[0,0]"));

  const fetchRoute = async (dest: any) => {
    const latlin = JSON.parse(localStorage.getItem('lat') ?? "[0,0]");
    const res = await axios.get(`http://localhost:5000/findRoute?loc=${startLoc[0]},${startLoc[1]}&dest=${[dest[0], dest[1]]}&transport=car`);
    setRoute(res.data.polyline);
    console.log(res.data.polyline);
    const waypoints = res.data.polyline.map((d:any) => L.latLng(d[0], d[1]));

    mapRef.current?.addLayer(L.polyline(waypoints,{
        color: '#6FA1EC',
        weight: 6
    }));

    setStartLoc(res.data.polyline.at(-1));
  }

  let tileLayerProps;

  if (!mode) {
    // Mode 0 settings
    tileLayerProps = {
      maxZoom: 20, // Change maxZoom for mode 0
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      url: 'https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=N4Wg0TMjUlhaEMEHKmlIneoOmd8dX5tbbveaZNUsHk0v838BXttsa4dyHhU8Ms1s',
    };
  } else {
    // Default settings
    tileLayerProps = {
      maxZoom: 20,
      attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy',
      url: 'https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=N4Wg0TMjUlhaEMEHKmlIneoOmd8dX5tbbveaZNUsHk0v838BXttsa4dyHhU8Ms1s',
    };
  }


  return (
    <MapContainer
      className="min-w-full min-h-screen z-0"
      center={[15, 15]}
      zoom={15}
      scrollWheelZoom={false}
      style={{ position: "relative" }}
      zoomControl={false} // Disable the default zoom control
      ref={mapRef}
    >

      <TileLayer {...tileLayerProps} />
      <LocationMarker />
      {data.map((i: any) =>
        <Marker key={i.title} position={[i.position.lat, i.position.lng]} icon={redIcon} eventHandlers={{
          click: () => {
            fetchRoute([i.position.lat, i.position.lng]);
          }
        }} >
          <Tooltip>{i.title}</Tooltip>
        </Marker>
      )}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}

export default Map;