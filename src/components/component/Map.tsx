"use client";
import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Pin from "./Pin";
import useLocationHotel from "@/hooks/useLocationHotel";
const Map = ({ data }: any) => {
    const { longitude, latitude } = useLocationHotel();
    // const map = useMap();
    // useEffect(() => {
    //     map.flyTo(
    //         [latitude || data[0].latitude, longitude || data[0].longitude],
    //         7
    //     );
    // }, [longitude, latitude]);
    return (
        <MapContainer
            center={[
                latitude || data[0].latitude,
                longitude || data[0].longitude,
            ]}
            zoom={7}
            scrollWheelZoom={false}
            className="w-full h-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data?.map((item: any) => (
                <Pin item={item} key={item.id} />
            ))}
        </MapContainer>
    );
};

export default Map;
