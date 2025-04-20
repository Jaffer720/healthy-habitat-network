import { useState } from "react";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/ui/Table";
import useResident from "../../../hooks/useResidents";
import useLocation from "../../../hooks/useLocations";
import ResidentForm from "../../../components/forms/Resident/ResidentForm";

export default function ResidentList() {
    const { residents, createResident, updateResident, deleteResident } = useResident();
    const { locations } = useLocation();

    const [modalOpen, setModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState({ name: "", age_group: "", gender: "", location_id: "", areas_of_interest: [] });

    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const columns = [
        { Header: "Name", accessor: "name" },
        { Header: "Age Group", accessor: "age_group" },
        { Header: "Gender", accessor: "gender" },
        { 
            Header: "Location", 
            accessor: "location_id",
            Cell: ({ value }) => locations.find(location => location.id === value)?.name || "Unknown"
        },
        { Header: "Areas of Interest", accessor: "areas_of_interest", Cell: ({ value }) => value.join(", ") },
    ];

    const handleAdd = () => {
        setEditData({ name: "", age_group: "", gender: "", location_id: "", areas_of_interest: [] });
        setIsEdit(false);
        setModalOpen(true);
    };

    const handleEdit = (id) => {
        setEditData(residents.find((resident) => resident.id === id));
        setEditId(id);
        setIsEdit(true);
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        const res = await deleteResident(deleteId);
        if (res.success) {
            alert("Resident deleted successfully");
        } else {
            alert("Error deleting resident");
        }
        setDeleteId(null);
        setConfirmOpen(false);
    };

    const handleSubmit = async (values) => {
        let res;
        if (!isEdit) {
            res = await createResident(values);
            if (res.success) {
                alert("Resident created successfully");
            } else {
                alert("Error creating resident");
            }
        } else {
            res = await updateResident(editId, values);
            if (res.success) {
                alert("Resident updated successfully");
                setEditId(null);
            } else {
                alert("Error updating resident");
            }
        }
        setModalOpen(false);
    };

    return (
        <div className="min-w-">
            <h1 className="text-xl font-bold mb-4">Resident List</h1>
            <Table columns={columns} data={residents || []} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={isEdit ? "Update Resident" : "Add Resident"}
            >
                <ResidentForm
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
                message={`Are you sure you want to delete ${residents.find(resident => resident.id === deleteId)?.name} resident?`}
            />
        </div>
    );
}