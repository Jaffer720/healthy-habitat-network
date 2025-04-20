// import useProtectedRoute from "../../../hooks/useProtectedRoute";
import { useState } from "react";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/ui/Table";
import useLocations from "../../../hooks/useLocations";
// import CouncilForm from "../../../components/forms/Location/CouncilForm";
import useCouncils from "../../../hooks/useCouncils";
import LocationForm from "../../../components/forms/Locataion/LocationForm";

export default function LocationList() {
    const { locations, createLocation, updateLocation, deleteLocation } = useLocations();
    const { councils } = useCouncils();
    const data = locations.map((location) => {
        const council_name = councils.find((council) => council.id === location.council_id)?.name;
        return { ...location, council_name: council_name };
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState({ name: "", council_id: "" });

    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const columns = [
        { Header: "Name", accessor: "name" },
        { Header: "Council Name", accessor: "council_name" },
    ];
    const handleAdd = () => {
        setEditData({ name: "", council_id: "" });
        setIsEdit(false);
        setModalOpen(true);
    };

    const handleEdit = (id) => {
        setEditData(locations.find((location) => location.id === id));
        setEditId(id);
        setIsEdit(true);
        setModalOpen(true);
    };


    const handleDelete = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        const res = await deleteLocation(deleteId);
        if (res.success) {
            alert("Location deleted successfully")
        } else {
            alert("Error deleting location")
        }
        setDeleteId(null);
        setConfirmOpen(false);
    };
    const handleSubmit = async (values) => {

        if (!isEdit) {
            const res = await createLocation(values)
            if (res.success) {
                alert("Location created successfully")
            } else {
                alert("Error creating location")
                console.log('res', res)
            }
        }
        else {
            const res = await updateLocation(editId, values)
            if (res.success) {
                alert("Location updated successfully")
                setEditId(null)
            } else {
                alert("Error updating location")
            }
        }
        setModalOpen(false);
        // refetch data if needed
    }


    return (
        <div className="min-w-">
            <h1 className="text-xl font-bold mb-4">Location List</h1>
            <Table columns={columns} data={data || []} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={isEdit ? "Update Location" : "Add Location"}
            >
                <LocationForm
                    initialValues={editData}
                    onSubmit={handleSubmit}
                    isEdit={isEdit}
                    councils={councils}
                />
            </Modal>
            <ConfirmModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                message={`Are you sure you want to delete ${locations.find(location => location.id === deleteId)?.name} location?`}
            />

        </div >
    );
}