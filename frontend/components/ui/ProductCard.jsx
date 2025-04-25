import React, { useState } from "react";
import { FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useVotes from "../../hooks/useVotes";
import Link from "next/link";

const ProductCard = ({ product }) => {
    const { user } = useAuth();
    const { votes, castVote, deleteVote } = useVotes();

    const [voted, setVoted] = useState(votes.find(vote => vote.resident_id === user?.id && vote.product_id === product?.id)?.vote_value || null); // 'yes' | 'no' | null

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
        <div className="border border-gray-200 p-4 rounded-2xl hover:shadow hover:scale-103 transition duration-200 bg-gray-50 flex flex-col justify-between">

        
        <div>
        <div className=" flex justify-between items-start">
            <h2 className="text-xl font-semibold">{product.name}</h2><p  className="text-xs uppercase bg-blue-500 rounded-xl  text-white px-2">{product.type}</p>
        </div>
            <p className="text-sm mb-1 font-medium text-blue-500">{product.business_name}
            </p>
            <p className="text-sm text-gray-500">
                Category: {product.category} | Quantity: {product.quantity_size}
            </p>

        </div>

            <div className="flex justify-between mt-4 align-middle">
            <p className="text-2xl font-semibold mt-1">
                ${product.price}  <span className="text-gray-500 uppercase text-xs">{product.price_range}</span>
            </p>

            <div className="flex justify-end">
                <div className="flex items-center gap-6 text-xl">
                    <button onClick={() => handleVote("Yes")}>
                        {voted === "Yes" ? (
                            <FaThumbsUp className="text-blue-600" />
                        ) : (
                            <FaRegThumbsUp className="text-blue-300 hover:scale-110 hover:text-blue-500 transition" />
                        )}
                    </button>

                    <button onClick={() => handleVote("No")}>
                        {voted === "No" ? (
                            <FaThumbsDown className="text-red-500" />
                        ) : (
                            <FaRegThumbsDown className="text-red-300 hover:scale-110 hover:text-red-500  transition" />
                        )}
                    </button>
                </div>
            </div>

            </div>
        </div>
    );
};

export default ProductCard;
