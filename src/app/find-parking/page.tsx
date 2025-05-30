'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from '@vis.gl/react-google-maps';
type CityName = keyof typeof parkingSpots;
const cities: {name: CityName; lat: number; lng: number}[] = [
    { name: "Delhi", lat: 28.679079, lng: 77.069710 },
    { name: "Mumbai", lat: 19.076090, lng: 72.877426 },
    { name: "Bangalore", lat: 12.972442, lng: 77.580643 },
    { name: "Chennai", lat: 13.067439, lng: 80.237617 },
    { name: "Kanpur", lat: 26.449923, lng: 80.331871 },
    { name: "Pune", lat: 18.516726, lng: 73.856255 },
    { name: "Kolkata", lat: 22.572645, lng: 88.363892 },
];

// Example parking spots for each city (in a real app, fetch from backend)
const parkingSpots = {
    Delhi: [
        { name: "Connaught Place", lat: 28.6315, lng: 77.2167, available: true, slots: 12, price: 30 },
        { name: "Karol Bagh", lat: 28.6517, lng: 77.1900, available: true, slots: 12, price: 30 }
    ],
    Mumbai: [
        { name: "Bandra", lat: 19.0600, lng: 72.8300, available: true, slots: 12, price: 30 },
        { name: "Andheri", lat: 19.1197, lng: 72.8468, available: true, slots: 12, price: 30 }
    ],
    Bangalore: [
        { name: "MG Road", lat: 12.9756, lng: 77.6050, available: true, slots: 12, price: 30 },
        { name: "Whitefield", lat: 12.9698, lng: 77.7499, available: true, slots: 12, price: 30 }
    ],
    Chennai: [
        { name: "T Nagar", lat: 13.0428, lng: 80.2337, available: true, slots: 12, price: 30 },
        { name: "Anna Nagar", lat: 13.0878, lng: 80.2170, available: true, slots: 12, price: 30 }
    ],
    Kanpur: [
        { name: "Swaroop Nagar", lat: 26.4850, lng: 80.3212, available: true, slots: 12, price: 30 },
        { name: "Kakadeo", lat: 26.4802, lng: 80.3010, available: true, slots: 12, price: 30 }
    ],
    Pune: [
        { name: "Shivaji Nagar", lat: 18.5308, lng: 73.8478, available: true, slots: 12, price: 30 },
        { name: "Kothrud", lat: 18.5074, lng: 73.8077, available: true, slots: 12, price: 30 }
    ],
    Kolkata: [
        { name: "Park Street", lat: 22.5532, lng: 88.3525, available: true, slots: 12, price: 30 },
        { name: "Salt Lake", lat: 22.5867, lng: 88.4172, available: true, slots: 12, price: 30 }
    ]
};

export default function FindParkingPage() {

    const [selectedCity, setSelectedCity] = useState(cities[0]);
    const [zoom, setZoom] = useState(12);
    const [center, setCenter] = useState({ lat: selectedCity.lat, lng: selectedCity.lng });
    const [selectedSpot, setSelectedSpot] = useState<null | any>(null);

    useEffect(() => {
        setCenter({ lat: selectedCity.lat, lng: selectedCity.lng });
        setZoom(12); // Optionally reset zoom when city changes
    }, [selectedCity]);

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <div className="flex flex-col items-center py-8 min-h-screen bg-background">
                <h1 className="text-3xl font-bold mb-6 text-primary">Find Parking</h1>
                <select
                    className="mb-6 px-4 py-2 rounded-xl border shadow"
                    value={selectedCity.name}
                    onChange={e => {
                        const city = cities.find(c => c.name === e.target.value);
                        setSelectedCity(city!);
                    }}
                >
                    {cities.map(city => (
                        <option key={city.name} value={city.name}>{city.name}</option>
                    ))}
                </select>
                <div className="w-full max-w-4xl h-[50vh] sm:h-[60vh] rounded-xl overflow-hidden shadow-lg">
                    <Map mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
                        center={center}
                        zoom={zoom}
                        onCameraChanged={ev => {
                            setCenter(ev.detail.center);
                            setZoom(ev.detail.zoom);
                        }}
                        style={{ width: '100%', height: '100%' }}
                        gestureHandling="greedy"
                    >
                    
                        {parkingSpots[selectedCity.name].map((spot, idx) => (
                            <AdvancedMarker
                                key={idx}
                                position={{ lat: spot.lat, lng: spot.lng }}
                                title={spot.name}
                                onClick={() => setSelectedSpot(spot)}
                                style={{
                                    animation: selectedSpot?.name === spot.name ? "bounce 0.5s" : "none"
                                }}
                            >
                                {/* <Pin background="#10B981" glyphColor="#fff" borderColor="#111827" />
                                 */}
                                <Pin
                                    background={selectedSpot?.name === spot.name ? "#2563eb" : "#10B981"}
                                    glyphColor="#fff"
                                    borderColor="#111827"
                                />
                            </AdvancedMarker>
                        ))}
                        {selectedSpot && (
                            // Inside your InfoWindow component
                            <InfoWindow
                                position={{ lat: selectedSpot.lat, lng: selectedSpot.lng }}
                                onCloseClick={() => setSelectedSpot(null)}
                            >
                                <div className="p-2">
                                    <h2 className="font-bold text-lg mb-1">{selectedSpot.name}</h2>
                                    <p>Status: <span className={selectedSpot.available ? "text-green-600" : "text-yellow-600"}>
                                        {selectedSpot.available ? "Available" : "Full"}
                                    </span></p>
                                    <p>Slots: {selectedSpot.slots}</p>
                                    <p>Price: ₹{selectedSpot.price} /hr</p>
                                    {selectedSpot.available && (
                                        <button
                                            className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition"
                                            onClick={() => {
                                                // Redirect to book-slot page with query params
                                                window.location.href = `/book-slot?city=${encodeURIComponent(selectedCity.name)}&spot=${encodeURIComponent(selectedSpot.name)}`;
                                            }}
                                        >
                                            Select This Spot
                                        </button>
                                    )}
                                </div>
                            </InfoWindow>

                        )}
                    </Map>
                </div>
            </div>
        </APIProvider>
    );
}
