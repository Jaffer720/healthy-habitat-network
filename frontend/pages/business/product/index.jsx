import { useState } from "react";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/ui/Table";

import useProducts from "../../../hooks/useProducts";
import useBusinesses from "../../../hooks/useBusinesses";
import useVotes from "../../../hooks/useVotes";

import ProductForm from "../../../components/forms/Product/ProductForm";
import { data } from "autoprefixer";

export default function ProductList() {
    const { products, createProduct, updateProduct, deleteProduct } = useProducts();
    const { businesses } = useBusinesses();
    const { votes } = useVotes();

    const data = products.map((product) => {
        const company = businesses.find((business) => business.id === product.business_id)?.name;
        const votes_count = votes.filter((vote) => vote.product_id === product.product_id).length;
        return { ...product, company, votes_count };
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState({
        product_id: "",
        business_id: "",
        name: "",
        description: "",
        quantity_size: "",
        category: "",
        price: "",
        type: "product",
        price_range: "affordable"

    });

    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const columns = [
        { Header: "Name", accessor: "name" },
        { Header: "Company", accessor: "company" },
        { Header: "Votes", accessor: "votes_count" },
        { Header: "Quantity/Size", accessor: "quantity_size" },
        { Header: "Price", accessor: "price" },
        { Header: "Type", accessor: "type" },
        { Header: "Category", accessor: "category" },
        { Header: "Range", accessor: "price_range" },
        // { Header: "Description", accessor: "description" },
    ];

    // Sort products by votes_count descending
    const sortedProducts = (data || []).slice().sort((a, b) => (b.votes_count || 0) - (a.votes_count || 0));

    const handleAdd = () => {
        setEditData({
            product_id: "",
            business_id: "",
            name: "",
            description: "",
            quantity_size: "",
            category: "",
            price: "",
            type: "product",
            price_range: "affordable"
        });
        setIsEdit(false);
        setModalOpen(true);
    };

    const handleEdit = (id) => {
        const product = products.find((p) => p.product_id === id);
        setEditData(product);
        setEditId(id);
        setIsEdit(true);
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        const res = await deleteProduct(deleteId);
        if (res.success) {
            alert("Product deleted successfully");
        } else {
            alert("Error deleting product");
        }
        setDeleteId(null);
        setConfirmOpen(false);
    };

    const handleSubmit = async (values) => {
        let res;
        if (!isEdit) {
            res = await createProduct(values);
            if (res.success) {
                alert("Product created successfully");
            } else {
                alert("Error creating product");
            }
        } else {
            res = await updateProduct(editId, values);
            if (res.success) {
                alert("Product updated successfully");
                setEditId(null);
            } else {
                alert("Error updating product");
            }
        }
        setModalOpen(false);
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Product List</h1>
            <Table
                columns={columns}
                data={sortedProducts || []}
                onAdd={handleAdd}
                onEdit={row => handleEdit(row.product_id)}
                onDelete={row => handleDelete(row.product_id)}
            />
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={isEdit ? "Update Product" : "Add Product"}
            >
                <ProductForm
                    initialValues={editData}
                    onSubmit={handleSubmit}
                    isEdit={isEdit}
                />
            </Modal>
            <ConfirmModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                message={`Are you sure you want to delete ${products.find(product => product.product_id === deleteId)?.name} product?`}
            />
        </div>
    );
}