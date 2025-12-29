import React, { useEffect, useState } from 'react';

const ShowProduct = () => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch('http://localhost/show_product.php')
            .then(response => response.json())
            .then(data => {
                setProduct(data);
            })
            .catch(error => console.error('Error fetching product data: ', error));
    }, []);

    return (
        <div>
            {product ? (
                <div>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    {/* เพิ่มการแสดงผลข้อมูลอื่น ๆ ตามต้องการ */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ShowProduct;
