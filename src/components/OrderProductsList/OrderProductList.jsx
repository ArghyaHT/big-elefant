import React, { useState, useMemo } from 'react';
import styles from "./OrderProductList.module.css";
import banner1 from "../../assets/banner1.png"
import banner2 from "../../assets/banner2.png"
import sparklingWater from "../../assets/sparkling-water.png"
import drinnkingWater from "../../assets/drinking-water.png"
import { sanityClient } from '../../utils/sanityClient';
import { useEffect } from 'react';

const OrderProductList = ({ user, filters }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        const fetchOrders = async () => {
            try {
                const query = `*[_type == "order" && email == "${user.email}"]{
                    orderId,
                    paymentId,
                    status,
                    submittedAt,
                    name,
                    products[]{
                        id,
                        name,
                        price,
                        quantity,
                        packSize,
                        currency,
                      productImage
                    }
                }`;

                const result = await sanityClient.fetch(query);

                console.log("Orders", result)

                // Flatten products with order metadata
                const flattened = result.flatMap(order =>
                    order.products.map(product => ({
                        ...product,
                        orderId: order.orderId,
                        orderDate: order.submittedAt,
                        customerName: order.name,
                        productImage: product.productImage || '',
                        orderStatus: order.status // You can replace this with dynamic status if you have one
                    }))
                );

                setOrders(flattened);
            } catch (error) {
                console.error('❌ Failed to fetch orders:', error);
            }
        };

        fetchOrders();
    }, [user]);
    
    const filteredProducts = useMemo(() => {
        return orders.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = filters?.status?.length
                ? filters.status.includes(product.orderStatus)
                : true;

            const matchesDate = filters?.date?.length
                ? filters.date.some(dateFilter => {
                    const productDate = new Date(product.orderDate);
                    const now = new Date();

                    if (dateFilter === "Last 30 Days") {
                        const thirtyDaysAgo = new Date(now);
                        thirtyDaysAgo.setDate(now.getDate() - 30);
                        return productDate >= thirtyDaysAgo;
                    }

                    if (dateFilter === "Older") return productDate.getFullYear() < now.getFullYear();

                    return productDate.getFullYear() === parseInt(dateFilter);
                })
                : true;

            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [searchTerm, orders, filters]);

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
                {filteredProducts.map((product, index) => (
                    <div key={`${product.id}-${index}`} className={styles.productListItem}>
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
                                <span className={styles.customerName}>{product.name}</span>
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
