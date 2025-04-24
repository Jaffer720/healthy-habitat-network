import { createContext, useEffect, useState } from "react";

export const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
    const [votes, setVotes] = useState([]);

    const fetchVotes = async () => {
        const res = await fetch("http://localhost:8000/index.php/api/votes");
        const data = await res.json();
        console.log("votes", data);
        setVotes(data.data);
    };

    const castVote = async (payload) => {
        // console.log('pay', payload)
        const res = await fetch("http://localhost:8000/index.php/api/votes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (result.success) fetchVotes();
        // else alert(result.error || "Vote failed.");
        return result;
    };

    const deleteVote = async (id) => {
        const res = await fetch(`http://localhost:8000/index.php/api/votes?id=${id}`, {
            method: "DELETE",
        });
        const result = await res.json();
        if (result.success) fetchVotes();
        // else alert(result.error || "Failed to delete vote.");
        return result;
    };

    useEffect(() => {
        fetchVotes();
    }, []);

    return (
        <VoteContext.Provider value={{ votes, castVote, deleteVote }}>
            {children}
        </VoteContext.Provider>
    );
};
