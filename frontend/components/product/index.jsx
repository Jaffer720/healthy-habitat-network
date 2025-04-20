import React from 'react';
import { Card, Typography } from 'antd';
import { useProduct } from '../../hooks/useProduct';

const { Title, Text } = Typography;

const ProductCard = () => {
    const { products } = useProduct(); // Assuming useProduct returns an object with a 'products' array

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {products.map((product) => (
                <Card
                    key={product.product_id}
                    title={<Title level={4}>{product.name}</Title>}
                    style={{ width: 300 }}
                >
                    <Text strong>Business Name:</Text> <Text>{product.business_id}</Text>
                    <br />
                    <Text strong>Product ID:</Text> <Text>{product.product_id}</Text>
                    <br />
                    <Text strong>Description:</Text> <Text>{product.description}</Text>
                    <br />
                    <Text strong>Size:</Text> <Text>{product.size}</Text>
                    <br />
                    <Text strong>Price:</Text> <Text>${product.price}</Text>
                    <br />
                    <Text strong>Type:</Text> <Text>{product.type}</Text>
                    <br />
                    <Text strong>Category:</Text> <Text>{product.category}</Text>
                </Card>
            ))}
        </div>
    );
};

export default ProductCard;