import { createContext, useEffect, useState } from "react";

export const CouncilContext = createContext();

export const CouncilProvider = ({ children }) => {
    const [councils, setCouncils] = useState([]);

    const fetchCouncils = async () => {
        const res = await fetch("http://localhost:8000/index.php/api/councils");
        const data = await res.json();
        setCouncils(data.data);
    };

    const createCouncil = async (council) => {
        const res = await fetch("http://localhost:8000/index.php/api/councils", { // Updated endpoint
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(council),
        });
        const result = await res.json();
        if (result.success) fetchCouncils();
        return result
    };

    const updateCouncil = async (id, updatedData) => {
        const res = await fetch(`http://localhost:8000/index.php/api/councils?id=${id}`, { // Updated endpoint  
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });
        const result = await res.json();
        if (result.success) fetchCouncils();
        return result;
    };

    const deleteCouncil = async (id) => {
        const res = await fetch(`http://localhost:8000/index.php/api/councils?id=${id}`, { // Updated endpoint
            method: "DELETE",
        });
        const result = await res.json();
        console.log('result', result)
        if (result.success) setCouncils(result.data);   
        return result;
    };

    useEffect(() => {
        fetchCouncils();
    }, []);

    return (
        <CouncilContext.Provider value={{ councils, createCouncil, updateCouncil, deleteCouncil }}>
            {children}
        </CouncilContext.Provider>
    );
};