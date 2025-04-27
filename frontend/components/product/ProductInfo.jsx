export default function ProductInfo({ product }) {
    if (!product) return null;

    return (
        <div className="flex-1 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <p><strong>Business:</strong> {product.business_name}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Type:</strong> {product.type}</p>
            <p><strong>Size/Quantity:</strong> {product.size}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Price Range:</strong> {product.price_range}</p>
            {/* {product.image && (
                <img src={product.image} alt={product.name} className="mt-4 rounded" />
            )} */}
        </div>
    );
}
