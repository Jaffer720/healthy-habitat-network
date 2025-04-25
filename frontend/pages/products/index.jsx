import React, { useState } from 'react';
import useProducts from '../../hooks/useProducts'; // Assuming you have a custom hook for fetching products
import ProductCard from '../../components/ui/ProductCard'; // Assuming you have a ProductCard component
import useBusinesses from '../../hooks/useBusinesses';

const ProductsPage = () => {
    const { products } = useProducts(); // Fetch products using the custom hook
    const { businesses } = useBusinesses(); // Fetch businesses using the custom hook

    const refined_products = products.map((product) => {
        const business_name = businesses.find((business) => business.id === product.business_id)?.name;
        return { ...product, business_name };
    });

    const [searchText, setSearchText] = useState('');
    const [filters, setFilters] = useState({
        type: '',
        category: '',
        priceRange: [0, 1000], // Example price range
        price_range: '', // New field for price_range
    });

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const filteredProducts = refined_products
        .filter((product) =>
            product.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .filter((product) => {
            if (filters.type && product.type !== filters.type) return false;
            if (filters.category && product.category !== filters.category) return false;
            if (
                product.price < filters.priceRange[0] ||
                product.price > filters.priceRange[1]
            )
                return false;
            if (filters.price_range && product.price_range !== filters.price_range)
                return false;
            return true;
        });

    return (
        <div className="lg:flex">
            {/* Filter Panel */}
            <div className="lg:w-1/5 p-4 border-r border-gray-300">
                <h3 className="text-lg font-semibold mb-4">Filters</h3>
                <div className=' max-lg:grid grid-cols-1 md:grid-cols-2  gap-2'>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Type:</label>
                    <select
                        className="w-full border border-gray-300 rounded p-2"
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="product">Product</option>
                        <option value="service">Service</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Category:</label>
                    <select
                        className="w-full border border-gray-300 rounded p-2"
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Reusable Health Products">Reusable Health Products</option>
                        <option value="Healty Eating">Medical Supplies</option>
                        <option value="Fitness & Wellness">Fitness and Wellness</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Price Range:</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            className="w-1/2 border border-gray-300 rounded p-2"
                            value={filters.priceRange[0]}
                            onChange={(e) =>
                                handleFilterChange('priceRange', [
                                    Number(e.target.value),
                                    filters.priceRange[1],
                                ])
                            }
                        /><span>_</span>
                        <input
                            type="number"
                            className="w-1/2 border border-gray-300 rounded p-2"
                            value={filters.priceRange[1]}
                            onChange={(e) =>
                                handleFilterChange('priceRange', [
                                    filters.priceRange[0],
                                    Number(e.target.value),
                                ])
                            }
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Price Range (Category):</label>
                    <select
                        className="w-full border border-gray-300 rounded p-2"
                        value={filters.price_range}
                        onChange={(e) => handleFilterChange('price_range', e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="affordable">Affordable</option>
                        <option value="moderate">Moderate</option>
                        <option value="premium">Premium</option>
                    </select>
                </div>

                </div>
            </div>

            {/* Products Section */}
            <div className="lg:w-4/5 p-4">
                <h1 className="text-2xl font-bold mb-4">Products</h1>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full border border-gray-300 rounded p-2 mb-4"
                    value={searchText}
                    onChange={handleSearchChange}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductsPage;