import { createContext, useEffect, useState } from "react";

export const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
    const [votes, setVotes] = useState([]);

    const fetchVotes = async () => {
        const res = await fetch("http://localhost:8000/index.php/api/votes");
        // console.log(await res.json())
        if(await res.json() !== undefined) {
            const data = await res.json();
            setVotes(data);
        }
    };

    const castVote = async (payload) => {
        const res = await fetch("http://localhost:8000/index.php/api/votes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if ((await res.json()).success) fetchVotes();
    };

    const deleteVote = async (id) => {
        const res = await fetch(`http://localhost:8000/index.php/api/votes?id=${id}`, {
            method: "DELETE",
        });
        if ((await res.json()).success) fetchVotes();
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
