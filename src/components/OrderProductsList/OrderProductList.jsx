import React, { useState, useMemo } from 'react';
import styles from "./OrderProductList.module.css";
import banner1 from "../../assets/banner1.png"
import banner2 from "../../assets/banner2.png"
import sparklingWater from "../../assets/sparkling-water.png"
import drinnkingWater from "../../assets/drinking-water.png"


// Mock product list with order-specific fields
const mockProducts = [
    {
        id: 1,
        productName: "Still Drinking Water",
        title: "my husband AURA POINTs when you hold our can",
        shortDescription:
            "We’re delivering pure still mountain water in cans that are 100% endlessly recyclable. Environmentally friendly? Without a doubt.",
        description:
            "Level up your hydration game. We’re serving up pure mountain water in cans that are legit forever recyclable.",
        features: "Still Drinking Water, Infinitely Recyclable Cans",
        writer: "Kelly",
        productImage: drinnkingWater,
        background: banner1,
        backgroundColor: "#5D6984",
        tags: ["Mountain Water", "Bold Taste", "Eco-Friendly"],
        price: 35,
        currency: "$",
        productImages: [drinnkingWater, sparklingWater],
        category: "Water",
        orderStatus: "Delivered",
        orderDate: "2024-07-01",
        packSize: 2,
        customerName: "John Doe",
        phoneNumber: "+91 1234567890"
    },
    {
        id: 2,
        productName: "Sparkling Water",
        title: "You won't believe it’s not soda.",
        shortDescription:
            "Our crisp mountain-sourced sparkling water comes in endlessly recyclable cans—refreshment with a mission.",
        description:
            "Sparkling water with no artificial sweeteners, sourced from pristine peaks.",
        features: "Sparkling Water, No Artificial Sweeteners",
        writer: "Kelly",
        productImage: sparklingWater,
        background: banner2,
        backgroundColor: "#5D8469",
        tags: ["Fizz", "Eco-Friendly"],
        price: 50,
        currency: "$",
        productImages: [sparklingWater, drinnkingWater],
        category: "Water",
        orderStatus: "On the Way",
        orderDate: "2024-07-28",
        packSize: 6,
        customerName: "John Doe",
        phoneNumber: "+91 1234567890"
    },

    {
        id: 3,
        productName: "Still Drinking Water",
        title: "my husband AURA POINTs when you hold our can",
        shortDescription:
            "We’re delivering pure still mountain water in cans that are 100% endlessly recyclable. Environmentally friendly? Without a doubt.",
        description:
            "Level up your hydration game. We’re serving up pure mountain water in cans that are legit forever recyclable.",
        features: "Still Drinking Water, Infinitely Recyclable Cans",
        writer: "Kelly",
        productImage: drinnkingWater,
        background: banner1,
        backgroundColor: "#5D6984",
        tags: ["Mountain Water", "Bold Taste", "Eco-Friendly"],
        price: 35,
        currency: "$",
        productImages: [drinnkingWater, sparklingWater],
        category: "Water",
        orderStatus: "Delivered",
        orderDate: "2025-07-12",
        packSize: 4,
        customerName: "John Doe",
        phoneNumber: "+91 1234567890"
    },
    {
        id: 4,
        productName: "Sparkling Water",
        title: "You won't believe it’s not soda.",
        shortDescription:
            "Our crisp mountain-sourced sparkling water comes in endlessly recyclable cans—refreshment with a mission.",
        description:
            "Sparkling water with no artificial sweeteners, sourced from pristine peaks.",
        features: "Sparkling Water, No Artificial Sweeteners",
        writer: "Kelly",
        productImage: sparklingWater,
        background: banner2,
        backgroundColor: "#5D8469",
        tags: ["Fizz", "Eco-Friendly"],
        price: 50,
        currency: "$",
        productImages: [sparklingWater, drinnkingWater],
        category: "Water",
        orderStatus: "On the Way",
        orderDate: "2025-07-28",
        packSize: 1,
        customerName: "John Doe",
        phoneNumber: "+91 1234567890"
    },

    {
        id: 5,
        productName: "Still Drinking Water",
        title: "my husband AURA POINTs when you hold our can",
        shortDescription:
            "We’re delivering pure still mountain water in cans that are 100% endlessly recyclable. Environmentally friendly? Without a doubt.",
        description:
            "Level up your hydration game. We’re serving up pure mountain water in cans that are legit forever recyclable.",
        features: "Still Drinking Water, Infinitely Recyclable Cans",
        writer: "Kelly",
        productImage: drinnkingWater,
        background: banner1,
        backgroundColor: "#5D6984",
        tags: ["Mountain Water", "Bold Taste", "Eco-Friendly"],
        price: 35,
        currency: "$",
        productImages: [drinnkingWater, sparklingWater],
        category: "Water",
        orderStatus: "Delivered",
        orderDate: "2025-07-12",
        packSize: 4,
        customerName: "John Doe",
        phoneNumber: "+91 1234567890"
    },
    {
        id: 6,
        productName: "Sparkling Water",
        title: "You won't believe it’s not soda.",
        shortDescription:
            "Our crisp mountain-sourced sparkling water comes in endlessly recyclable cans—refreshment with a mission.",
        description:
            "Sparkling water with no artificial sweeteners, sourced from pristine peaks.",
        features: "Sparkling Water, No Artificial Sweeteners",
        writer: "Kelly",
        productImage: sparklingWater,
        background: banner2,
        backgroundColor: "#5D8469",
        tags: ["Fizz", "Eco-Friendly"],
        price: 50,
        currency: "$",
        productImages: [sparklingWater, drinnkingWater],
        category: "Water",
        orderStatus: "On the Way",
        orderDate: "2025-07-28",
        packSize: 1,
        customerName: "John Doe",
        phoneNumber: "+91 1234567890"
    },

    {
        id: 7,
        productName: "Still Drinking Water",
        title: "my husband AURA POINTs when you hold our can",
        shortDescription:
            "We’re delivering pure still mountain water in cans that are 100% endlessly recyclable. Environmentally friendly? Without a doubt.",
        description:
            "Level up your hydration game. We’re serving up pure mountain water in cans that are legit forever recyclable.",
        features: "Still Drinking Water, Infinitely Recyclable Cans",
        writer: "Kelly",
        productImage: drinnkingWater,
        background: banner1,
        backgroundColor: "#5D6984",
        tags: ["Mountain Water", "Bold Taste", "Eco-Friendly"],
        price: 35,
        currency: "$",
        productImages: [drinnkingWater, sparklingWater],
        category: "Water",
        orderStatus: "Delivered",
        orderDate: "2025-07-12",
        packSize: 4,
        customerName: "John Doe",
        phoneNumber: "+91 1234567890"
    },
    {
        id: 8,
        productName: "Sparkling Water",
        title: "You won't believe it’s not soda.",
        shortDescription:
            "Our crisp mountain-sourced sparkling water comes in endlessly recyclable cans—refreshment with a mission.",
        description:
            "Sparkling water with no artificial sweeteners, sourced from pristine peaks.",
        features: "Sparkling Water, No Artificial Sweeteners",
        writer: "Kelly",
        productImage: sparklingWater,
        background: banner2,
        backgroundColor: "#5D8469",
        tags: ["Fizz", "Eco-Friendly"],
        price: 50,
        currency: "$",
        productImages: [sparklingWater, drinnkingWater],
        category: "Water",
        orderStatus: "On the Way",
        orderDate: "2025-07-28",
        packSize: 1,
        customerName: "John Doe",
        phoneNumber: "+91 1234567890"
    },
];

const OrderProductList = ({ products = mockProducts, user, filters }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Filtered and searched products
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = filters?.status.length
                ? filters.status.includes(product.orderStatus)
                : true;

            const matchesDate = filters?.date.length
                ? filters.date.some(dateFilter => {
                    const productYear = new Date(product.orderDate).getFullYear();
                    if (dateFilter === "Last 30 Days") {
                        const thirtyDaysAgo = new Date();
                        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                        return new Date(product.orderDate) >= thirtyDaysAgo;
                    }
                    if (dateFilter === "Older") return productYear < 2023;
                    return productYear === parseInt(dateFilter);
                })
                : true;

            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [searchTerm, products, filters]);

    return (
        <div className={styles.orderProductListContainer}>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search your orders here..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <button
                    onClick={() => setSearchTerm(inputValue)}
                    className={styles.searchButton}
                >
                    Search
                </button>
            </div>

            <div className={styles.productList}>
                {filteredProducts.map((product) => (
                    <div key={product.id} className={styles.productListItem}>
                        <div
                            className={styles.imageWrapper}
                            style={{ backgroundColor: product.backgroundColor }}
                        >
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                className={styles.productImage}
                            />
                        </div>

                        <div className={styles.productContent}>
                            <div className={styles.productTopRow}>
                                <span className={styles.customerName}>{product.customerName}</span>
                                <span className={styles.productPrice}>
                                    {product.currency}
                                    {product.price}
                                </span>
                                <span className={styles.orderDate}>
                                    Ordered on: {new Date(product.orderDate).toLocaleDateString()}
                                </span>
                            </div>

                            <div className={styles.productBottomRow}>
                                <span className={styles.packSize}>Size: {product.packSize} pack</span>
                                <span className={styles.orderStatus}>
                                    Status: {product.orderStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                {filteredProducts.length === 0 && (
                    <p className={styles.noResults}>No orders found.</p>
                )}
            </div>

        </div>
    );
};

export default OrderProductList;
