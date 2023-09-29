"use client"
import React from "react"

import { MapContainer } from 'react-leaflet'
import { TileLayer } from 'react-leaflet'
import { useMap, Popup, Marker } from 'react-leaflet'

import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from "leaflet"

const icon = L.icon({ 
    iconRetinaUrl:iconRetina.src, 
    iconUrl: iconMarker.src, 
    shadowUrl: iconShadow.src 
});

export default function Map() {
    return (
        <MapContainer className="min-w-full min-h-screen z-0" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]} icon={icon} >
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        </MapContainer>
    )
}