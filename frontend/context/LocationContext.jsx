import { createContext, useEffect, useState } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [locations, setLocations] = useState([]);

    const fetchLocations = async () => {
        const res = await fetch("http://localhost:8000/index.php/api/locations");
        const data = await res.json();
        setLocations(data.data);
    };

    const createLocation = async (payload) => {
        const res = await fetch("http://localhost:8000/index.php/api/locations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (result.success) fetchLocations();
        return result;
    };

    const updateLocation = async (id, payload) => {
        const res = await fetch(`http://localhost:8000/index.php/api/locations?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (result.success) fetchLocations();
        return result;
    };

    const deleteLocation = async (id) => {
        const res = await fetch(`http://localhost:8000/index.php/api/locations?id=${id}`, {
            method: "DELETE",
        });
        const result = await res.json();
        if (result.success) fetchLocations();
        return result;
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    return (
        <LocationContext.Provider value={{ locations, createLocation, updateLocation, deleteLocation }}>
            {children}
        </LocationContext.Provider>
    );
};
