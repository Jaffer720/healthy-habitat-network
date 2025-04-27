import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useVotes from "../../hooks/useVotes";
import useProducts from "../../hooks/useProducts";
import useResidents from "../../hooks/useResidents";
import useBusinesses from "../../hooks/useBusinesses";
import useAuth from "../../hooks/useAuth";


import ProductInfo from "../../components/product/ProductInfo";
import ProductVoting from "../../components/product/ProductVoting";
import ResidentVotesTable from "../../components/product/ResidentVotesTable";

export default function ProductDetailPage() {
    const { id } = useRouter().query;
    const { votes, castVote, deleteVote } = useVotes();
    const { products } = useProducts();
    const { residents } = useResidents();
    const { businesses } = useBusinesses();
    const { user } = useAuth();

    const [product, setProduct] = useState(null);
    const [residentVotes, setResidentVotes] = useState([]);
    const [voted, setVoted] = useState(votes.find(vote => vote.resident_id === user?.id && vote.product_id === product?.id)?.vote_value || null); // 'yes' | 'no' | null

    const handleVote = async (value) => {
        // check if user is logged in and has the role of resident
        if (user && user.role !== "resident") {
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

    useEffect(() => {
        const selectedProduct = products.find((p) => p.id == id);
        const business_name = businesses.find((business) => business.id === selectedProduct.business_id)?.name;
        setProduct({ ...selectedProduct, business_name });

        const filteredVotes = votes.filter((vote) => vote.product_id == id);
        const refine_votes = filteredVotes.map((vote) => {
            console.log('user', user)
            const resident = residents.find((r) => r.id === vote.resident_id)?.name || 'Unknown';
            return {
                ...vote,
                resident_name: resident,
            };
        });
        setResidentVotes(refine_votes);
    }, [id, products, votes, businesses, residents, user]);

    if (!product) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="container mx-auto p-6 flex flex-col gap-10">
            <div className="flex flex-col md:flex-row gap-8">
                <ProductInfo product={product} />
                <ProductVoting residentVotes={residentVotes} handleVote={handleVote} voted={voted} />
            </div>

            <ResidentVotesTable residentVotes={residentVotes} />
        </div>
    );
}
