// import useProtectedRoute from "../../../hooks/useProtectedRoute";
import { useState } from "react";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/ui/Table";
import useCouncil from "../../../hooks/useCouncils";
import CouncilForm from "../../../components/forms/Council/CouncilForm";

export default function CouncilList() {
    const { councils, createCouncil, updateCouncil, deleteCouncil } = useCouncil();

    const [modalOpen, setModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState({ name: "", region: "" });

    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const columns = [
        { Header: "Name", accessor: "name" },
        { Header: "Region", accessor: "region" },
    ];
    const handleAdd = () => {
        setEditData({ name: "", region: "" });
        setIsEdit(false);
        setModalOpen(true);
    };

    const handleEdit = (id) => {
        setEditData(councils.find((council) => council.id === id));
        setEditId(id);
        setIsEdit(true);
        setModalOpen(true);
    };


    const handleDelete = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        const res = await deleteCouncil(deleteId);
        console.log('res', res)
        if (res.success) {
            alert("Council deleted successfully")
        } else {
            alert("Error deleting council")
        }
        setDeleteId(null);
        setConfirmOpen(false);
    };
    const handleSubmit = async (values) => {

        if (!isEdit) {
           const res = await createCouncil(values)
            if (res.success) {
                alert("Council created successfully")
            } else {
                alert("Error creating council")
            }
        }
        else {
            const res = await updateCouncil(editId, values)
            if (res.success) {
                alert("Council updated successfully")
                setEditId(null)
            } else {
                alert("Error updating council")
            }
        }
        setModalOpen(false);
        // refetch data if needed
    }


    return (
        <div className="min-w-">
            <h1 className="text-xl font-bold mb-4">Council List</h1>
            <Table columns={columns} data={councils || []} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={isEdit ? "Update Council" : "Add Council"}
            >
                <CouncilForm
                    initialValues={editData}
                    onSubmit={handleSubmit}
                    isEdit={isEdit}
                />
            </Modal>
            <ConfirmModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                message={`Are you sure you want to delete ${councils && councils.find(council => council.id === deleteId)?.name} council?`}
            />

        </div >
    );
}