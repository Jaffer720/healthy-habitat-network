import React, { useState } from "react";
import { FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useVotes from "../../hooks/useVotes";

const ProductCard = ({ product }) => {
    const { user } = useAuth();
    const { votes, castVote, deleteVote } = useVotes();

    const [voted, setVoted] = useState(votes.find(vote => vote.resident_id === user.id && vote.product_id === product?.id)?.vote_value || null); // 'yes' | 'no' | null

    const handleVote = async (value) => {
        // check if user is logged in and has the role of resident
        if (!user && user.role !== "resident") {
            alert("Only logged-in residents can vote.");
            return;
        }
        // delete vote if already voted with the same value
        if (voted === value) {
            const res = await deleteVote(votes.find(vote => vote.resident_id === user.id && vote.product_id === product.id).id);
            if (res?.success) {
                setVoted(null);
            } else {
                alert(res?.error || "Failed to delete vote.");
            }
            return;
        }
        else if (voted !== null) {
            // check if user has already voted
            const existingVote = votes.find(vote => vote.resident_id === user.id && vote.product_id === product.id);
            if (existingVote) {
                const res = await deleteVote(existingVote.id);
                if (res?.success) {
                    setVoted(null);
                } else {
                    alert(res?.error || "Failed to delete vote.");
                }
            }
        }
        const res = await castVote({ resident_id: user.id, product_id: product.id, vote_value: value });
        if (res?.success) {
            setVoted(value);
        } else {
            alert(res?.error || "Failed to submit vote.");
        }
    };

    return (
        <div className="border p-4 rounded shadow-md bg-white">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">{product.business_name}</span>
            </p>
            <p className="text-sm text-gray-500">
                Category: {product.category} | Type: {product.type} | Quantity: {product.quantity_size}
            </p>
            <p className="text-lg font-semibold mt-1">
                ${product.price} — <span className="text-gray-500">{product.price_range}</span>
            </p>

            <div className="mt-4">
                <p className="font-medium mb-2">Are you interested?</p>
                <div className="flex items-center gap-6 text-xl">
                    <button onClick={() => handleVote("Yes")}>
                        {voted === "Yes" ? (
                            <FaThumbsUp className="text-green-600" />
                        ) : (
                            <FaRegThumbsUp className="text-green-600 hover:scale-110 transition" />
                        )}
                    </button>

                    <button onClick={() => handleVote("No")}>
                        {voted === "No" ? (
                            <FaThumbsDown className="text-red-500" />
                        ) : (
                            <FaRegThumbsDown className="text-red-500 hover:scale-110 transition" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
