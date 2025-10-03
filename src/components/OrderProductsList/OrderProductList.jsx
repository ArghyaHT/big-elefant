import React, { useState, useMemo, useEffect } from 'react';
import styles from "./OrderProductList.module.css";
import { sanityClient } from '../../utils/sanityClient';

const OrderProductList = ({ user, filters }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [orders, setOrders] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // ✅ Handle responsiveness
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // ✅ Fetch orders from Sanity
    useEffect(() => {
        if (!user?.email) return;

        const fetchOrders = async () => {
            try {
                const query = `*[_type == "order" && email == "${user.email}"]{
                    orderId,
                    paymentId,
                    subtotalPrice,
                    deliveryCharges,
                    discountCharges,
                    totalPrice,
                    paymentMode,
                    status,
                    submittedAt,
                    name,
                    products[]{
                        _type,
                        id,
                        name,
                        merchName,
                        price,
                        quantity,
                        packSize,
                        currency,
                        selectedSize,
                        selectedColor,
                        productImage
                    }
                }`;

                const result = await sanityClient.fetch(query);

                // ✅ Flatten and normalize products
                const flattened = result.flatMap(order =>
                    (order.products || []).map(product => ({
                        ...product,
                        name: product.name || product.merchName || "Unnamed Product",
                        orderId: order.orderId,
                        orderDate: order.submittedAt,
                        customerName: order.name,
                        orderStatus: order.status,
                        productImage: product.productImage || '',
                        paymentId: order.paymentId,
                        deliveryCharges: order.deliveryCharges,
                        discountCharges: order.discountCharges,
                        subtotalPrice: order.subtotalPrice,
                        totalPrice: order.totalPrice,
                        paymentMode: order.paymentMode
                    }))
                );

                setOrders(flattened);
            } catch (error) {
                console.error('❌ Failed to fetch orders:', error);
            }
        };

        fetchOrders();
    }, [user]);

    // ✅ Search, status, date filters
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

    // ✅ Group products by order
    const groupedOrders = useMemo(() => {
        const orderMap = new Map();

        filteredProducts.forEach(product => {
            const {
                orderId,
                orderDate,
                customerName,
                orderStatus,
                deliveryCharges,
                discountCharges,
                subtotalPrice,
                totalPrice,
                paymentId,
                paymentMode
            } = product;

            if (!orderMap.has(orderId)) {
                orderMap.set(orderId, {
                    orderId,
                    orderDate,
                    customerName,
                    orderStatus,
                    deliveryCharges,
                    discountCharges,
                    subtotalPrice,
                    totalPrice,
                    paymentId,
                    paymentMode,
                    products: []
                });
            }

            orderMap.get(orderId).products.push(product);
        });

        return Array.from(orderMap.values()).sort(
            (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );
    }, [filteredProducts]);

    return (
        <div className={styles.orderProductListContainer}>
            {/* 🔍 Search */}
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search your orders here..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <button
                    onClick={() => setSearchTerm(searchTerm)}
                    className={styles.searchButton}
                >
                    Search
                </button>
            </div>

            {/* 📦 Order List / Details */}
            <div
                className={`${styles.productList} ${selectedOrder ? styles.detailsView : styles.listView}`}
            >
                {selectedOrder ? (
                    // ✅ Order Details
                    <div className={styles.orderDetails}>
                        <button onClick={() => setSelectedOrder(null)} className={styles.backButton}>
                            ← Back to orders
                        </button>

                        <h2>Order Summary</h2>
                        <p><strong>{selectedOrder.products.length} items in this order</strong></p>

                        <ul className={styles.productListDetails}>
                            {selectedOrder.products.map((product, i) => (
                                <li key={i} className={styles.detailItem}>
                                    <img src={product.productImage} alt={product.name} className={styles.detailImage} />
                                    <div className={styles.productItem}>
                                        <p className={styles.productName}>
                                            {product.name}{product.packSize ? `/Pack Size ${product.packSize}` : ''}
                                        </p>
                                        <div className={styles.productRow}>
                                            <p className={styles.quantity}>{product.quantity} unit(s)</p>
                                            <p className={styles.price}>
                                                ₹{product.price * product.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <hr className={styles.divider} />

                        {/* Bill Summary */}
                        <div className={styles.billSummary}>
                            <h3 className={styles.billHeading}>Bill Details</h3>
                            <div className={styles.billRow}>
                                <span>Item Total</span>
                                <span>₹{selectedOrder.subtotalPrice ?? 0}</span>
                            </div>
                            <div className={styles.billRow}>
                                <span>Delivery Charges</span>
                                <span>₹{selectedOrder.deliveryCharges ?? 0}</span>
                            </div>
                            <div className={styles.billRow}>
                                <span>Discount</span>
                                <span>-₹{selectedOrder.discountCharges ?? 0}</span>
                            </div>
                            <div className={styles.totalRow}>
                                <strong>Bill Total</strong>
                                <strong>₹{selectedOrder.totalPrice ?? 0}</strong>
                            </div>
                        </div>

                        <hr className={styles.divider} />

                        {/* Extra Order Info */}
                        <div className={styles.orderDetails}>
                            <h3 className={styles.orderDetailsHeading}>Order Details</h3>
                            <div className={styles.detailRow}><span>Order ID:</span> <span>{selectedOrder.orderId}</span></div>
                            <div className={styles.detailRow}><span>Payment ID:</span> <span>{selectedOrder.paymentId || 'N/A'}</span></div>
                            <div className={styles.detailRow}><span>Payment Mode:</span> <span>{selectedOrder.paymentMode}</span></div>
                            <div className={styles.detailRow}><span>Customer Name:</span> <span>{selectedOrder.customerName}</span></div>
                            <div className={styles.detailRow}><span>Order Placed On:</span> <span>{new Date(selectedOrder.orderDate).toLocaleString()}</span></div>
                        </div>
                    </div>
                ) : (
                    // ✅ Orders List
                    <>
                        {groupedOrders.map((orderGroup, index) => (
                            <div
                                key={`${orderGroup.orderId}-${index}`}
                                className={styles.productListItem}
                                onClick={() => setSelectedOrder(orderGroup)}
                            >
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
                    </>
                )}
            </div>
        </div>
    );
};

export default OrderProductList;
