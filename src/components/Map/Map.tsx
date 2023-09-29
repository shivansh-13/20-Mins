"use client"
import React from "react"

import { MapContainer } from 'react-leaflet'
import { TileLayer } from 'react-leaflet'
import { useMap, Popup, Marker } from 'react-leaflet'

import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from "leaflet"

import 'leaflet/dist/leaflet.css';

const icon = L.icon({
    iconRetinaUrl: iconRetina.src,
    iconUrl: iconMarker.src,
    shadowUrl: iconShadow.src
});

export default function Map() {
    return (
        <MapContainer className="min-w-full min-h-screen" center={[45, -0.09]} zoom={10} scrollWheelZoom={false}>
            <TileLayer
                maxZoom={18}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyrigh">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}