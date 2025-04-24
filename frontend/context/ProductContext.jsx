import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await fetch("http://localhost:8000/index.php/api/products");
        const data = await res.json();
        setProducts(data.data);
    };

    const createProduct = async (product) => {
        const res = await fetch("http://localhost:8000/index.php/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        const result = await res.json();
        if (result.success) fetchProducts();
    };

    const updateProduct = async (id, updatedData) => {
        const res = await fetch(`http://localhost:8000/index.php/api/products?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });
        const result = await res.json();
        if (result.success) fetchProducts();
    };

    const deleteProduct = async (id) => {
        const res = await fetch(`http://localhost:8000/index.php/api/products?id=${id}`, {
            method: "DELETE",
        });
        const result = await res.json();
        if (result.success) fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, createProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
