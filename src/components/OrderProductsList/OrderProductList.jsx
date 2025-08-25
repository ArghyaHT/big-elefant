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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);



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

    // Group filtered products by orderId
    const groupedOrders = useMemo(() => {
        const orderMap = new Map();

        filteredProducts.forEach(product => {
            const { orderId } = product;
            if (!orderMap.has(orderId)) {
                orderMap.set(orderId, {
                    orderId,
                    orderDate: product.orderDate,
                    customerName: product.customerName,
                    orderStatus: product.orderStatus,
                    products: []
                });
            }
            orderMap.get(orderId).products.push(product);
        });

        return Array.from(orderMap.values()).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    }, [filteredProducts]);

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

                {groupedOrders.map((orderGroup, index) => (
                    <div key={`${orderGroup.orderId}-${index}`} className={styles.productListItem}>

                        <div className={styles.imageWrapper}>
                            {orderGroup.products.slice(0, isMobile ? 1 : 2).map((product, i) => (
                                <img
                                    key={i}
                                    src={product.productImage}
                                    alt={product.name}
                                    className={styles.productImage}
                                />
                            ))}
                        </div>

                        <div className={styles.productContent}>
                            <div className={styles.productRow}>
                                <div className={styles.leftColumn}>
                                    <span className={styles.customerName}>{orderGroup.customerName}</span>
                                    {orderGroup.products.length > (isMobile ? 1 : 2) && (
                                        <div className={styles.moreItems}>
                                            + {orderGroup.products.length - (isMobile ? 1 : 2)} more item
                                            {orderGroup.products.length - (isMobile ? 1 : 2) > 1 ? 's' : ''}
                                        </div>
                                    )}
                                </div>

                                <div className={styles.rightColumn}>
                                    <span className={styles.orderDate}>
                                        Ordered on: {new Date(orderGroup.orderDate).toLocaleDateString()}
                                    </span>
                                    <span className={styles.orderStatus}>
                                        Status: {orderGroup.orderStatus}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}

                {groupedOrders.length === 0 && (
                    <p className={styles.noResults}>No orders found.</p>
                )}
            </div>

        </div>
    );
};

export default OrderProductList;
