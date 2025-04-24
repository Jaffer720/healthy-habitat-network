import { createContext, useEffect, useState } from "react";

export const ResidentContext = createContext();

export const ResidentProvider = ({ children }) => {
    const [residents, setResidents] = useState([]);

    const fetchResidents = async () => {
        const res = await fetch("http://localhost:8000/index.php/api/residents");
        const data = await res.json();
        setResidents(data.data);
    };

    const createResident = async (payload) => {
        const res = await fetch("http://localhost:8000/index.php/api/residents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if ((await res.json()).success) fetchResidents();
    };

    const updateResident = async (id, payload) => {
        const res = await fetch(`http://localhost:8000/index.php/api/residents?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if ((await res.json()).success) fetchResidents();
    };

    const deleteResident = async (id) => {
        const res = await fetch(`http://localhost:8000/index.php/api/residents?id=${id}`, {
            method: "DELETE",
        });
        if ((await res.json()).success) fetchResidents();
    };

    useEffect(() => {
        fetchResidents();
    }, []);

    return (
        <ResidentContext.Provider value={{ residents, createResident, updateResident, deleteResident }}>
            {children}
        </ResidentContext.Provider>
    );
};
