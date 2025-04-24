import { createContext, useEffect, useState } from "react";

export const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
    const [businesses, setBusinesses] = useState([]);

    const fetchBusinesses = async () => {
        const res = await fetch("http://localhost:8000/index.php/api/businesses");
        const data = await res.json();
        setBusinesses(data.data);
    };

    const createBusiness = async (payload) => {
        const res = await fetch("http://localhost:8000/index.php/api/businesses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if ((await res.json()).success) fetchBusinesses();
    };

    const updateBusiness = async (id, payload) => {
        const res = await fetch(`http://localhost:8000/index.php/api/businesses?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if ((await res.json()).success) fetchBusinesses();
    };

    const deleteBusiness = async (id) => {
        const res = await fetch(`http://localhost:8000/index.php/api/businesses?id=${id}`, {
            method: "DELETE",
        });
        if ((await res.json()).success) fetchBusinesses();
    };

    useEffect(() => {
        fetchBusinesses();
    }, []);

    return (
        <BusinessContext.Provider value={{ businesses, createBusiness, updateBusiness, deleteBusiness }}>
            {children}
        </BusinessContext.Provider>
    );
};
