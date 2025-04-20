import { useState } from "react";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/ui/Table";

import useBusinesses from "../../../hooks/useBusinesses";
import useLocations from "../../../hooks/useLocations";

import BusinessForm from "../../../components/forms/Business/BusinessForm";

export default function BusinessList() {
    const { businesses, createBusiness, updateBusiness, deleteBusiness } = useBusinesses();
    const { locations } = useLocations();

    const [modalOpen, setModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState({ name: "", contact_info: "", certifications: "", location_id: "" });

    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const columns = [
        { Header: "Name", accessor: "name" },
        { Header: "Contact Info", accessor: "contact_info" },
        // { Header: "Certifications", accessor: "certifications" },
        {
            Header: "Location",
            accessor: "location_id",
            Cell: ({ value }) => locations.find(location => location.id === value)?.name || "Unknown"
        },
    ];

    const handleAdd = () => {
        setEditData({ name: "", contact_info: "", certifications: "", location_id: "" });
        setIsEdit(false);
        setModalOpen(true);
    };

    const handleEdit = (id) => {
        setEditData(businesses.find((business) => business.id === id));
        setEditId(id);
        setIsEdit(true);
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        const res = await deleteBusiness(deleteId);
        if (res.success) {
            alert("Business deleted successfully");
        } else {
            alert("Error deleting business");
        }
        setDeleteId(null);
        setConfirmOpen(false);
    };

    const handleSubmit = async (values) => {
        let res;
        if (!isEdit) {
            res = await createBusiness(values);
            if (res.success) {
                alert("Business created successfully");
            } else {
                alert("Error creating business");
            }
        } else {
            res = await updateBusiness(editId, values);
            if (res.success) {
                alert("Business updated successfully");
                setEditId(null);
            } else {
                alert("Error updating business");
            }
        }
        setModalOpen(false);
        // refetch data if needed
    };

    return (
        <div className="min-w-">
            <h1 className="text-xl font-bold mb-4">Business List</h1>
            <Table columns={columns} data={businesses || []} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={isEdit ? "Update Business" : "Add Business"}
            >
                <BusinessForm
                    initialValues={editData}
                    onSubmit={handleSubmit}
                    isEdit={isEdit}
                    locations={locations}
                />
            </Modal>
            <ConfirmModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                message={`Are you sure you want to delete ${businesses.find(business => business.id === deleteId)?.name} business?`}
            />
        </div>
    );
}