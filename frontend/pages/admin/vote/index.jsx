import { useState } from "react";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/ui/Table";
import useVotes from "../../../hooks/useVotes";
import useResident from "../../../hooks/useResidents";
import useLocation from "../../../hooks/useLocations";
// import VoteForm from "../../../components/forms/Vote/VoteForm";

export default function VoteList() {
    const { votes, createVote, deleteVote } = useVotes();
    const { residents } = useResident();
    const { products } = useLocation();

    // const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const columns = [
        { Header: "Resident", accessor: "residentName" },
        { Header: "Product", accessor: "productName" },
        { Header: "Vote Value", accessor: "vote_value" },
    ];

    const handleAdd = () => {
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        const res = await deleteVote(deleteId);
        if (res.success) {
            alert("Vote deleted successfully");
        } else {
            alert("Error deleting vote");
        }
        setDeleteId(null);
        setConfirmOpen(false);
    };

    const handleSubmit = async (values) => {
        const res = await createVote(values);
        if (res.success) {
            alert("Vote created successfully");
        } else {
            alert("Error creating vote");
        }
        setModalOpen(false);
        // refetch data if needed
    };

    const votesWithNames = votes.map((vote) => ({
        ...vote,
        residentName: residents.find((r) => r.id === vote.resident_id)?.name || "Unknown",
        productName: products.find((p) => p.id === vote.product_id)?.name || "Unknown",
    }));

    return (
        <div className="min-w-">
            <h1 className="text-xl font-bold mb-4">Vote List</h1>
            <Table
                columns={columns}
                data={votesWithNames || []}
                // onAdd={handleAdd}
                onDelete={handleDelete}
            />
            {/* <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Add Vote"
            >
                <VoteForm
                    residents={residents}
                    products={products}
                    onSubmit={handleSubmit}
                />
            </Modal> */}
            <ConfirmModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                message={`Are you sure you want to delete this vote?`}
            />
        </div>
    );
}
