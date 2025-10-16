import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaChevronDown } from "react-icons/fa";

import paytm from "../../assets/paytm.png"
import gpay from "../../assets/gpay.png"
import phonepay from "../../assets/phonepay.png"
import { FiTrash2 } from "react-icons/fi";

import sparklingWater from "../../assets/sparkling-water.png"
import drinnkingWater from "../../assets/drinking-water.png"

import banner1 from "../../assets/banner1.png"
import banner2 from "../../assets/banner2.png"

import styles from "./CheckOut.module.css";


import {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} from "../../redux/cartSlice"; // Update with your actual path
import { handleUpiPay } from "../Payments/Payments";
import { useEffect } from "react";

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Don't forget the styles
import { sanityClient } from "../../utils/sanityClient";
import { v4 as uuidv4 } from 'uuid';
import { refreshLoggedInUser } from "../../utils/refreshUser";
import RazorpayPayment from "../RazorPay/RazorPay";

import { useNavigate } from 'react-router-dom';
import { nanoid } from "@reduxjs/toolkit";



const products = [
    {
        id: 1,
        productName: "mountain water",
        title: "my husband AURA POINTs when you hold our can",
        shortDescription: "We’re delivering pure still mountain water in cans that are 100% endlessly recyclable. Environmentally friendly? Without a doubt. Sourced from pristine mountain peaks to keep you refreshed—while caring for the planet. Clean, crisp, and conscious. That’s the vibe.",
        description: "Level up your hydration game. We’re serving up pure mountain water in cans that are legit forever recyclable. Eco-conscious? Absolutely. Sourced from the freshest peaks, so you stay hydrated and keep the planet thriving. It’s a raging vibe.",
        features: "Still Drinking Water, Infinitely Recyclable Cans",
        writer: "Kelly",
        productImage: drinnkingWater,
        background: banner1,
        backgroundColor: "#5D6984",
        tags: ["Mountain Water", "Bold Taste", "Eco-Friendly", "Eternally Recyclable Cans"],
        price: 35,
        currency: "$",
        productImages: [drinnkingWater, sparklingWater],
        category: "Water",               // Added category here

    },
    {
        id: 2,
        productName: "Soda-flavored sparkling water",
        title: "You won't believe it’s not soda.",
        shortDescription: "Our crisp mountain-sourced sparkling water comes in endlessly recyclable cans—because refreshment should never come at the planet’s expense. Effervescent, eco-conscious, and seriously satisfying. It’s hydration with a fizz and a mission.",
        description: "Level up your hydration game. We’re serving up pure mountain water in cans that are legit forever recyclable. Eco-conscious? Absolutely. Sourced from the freshest peaks, so you stay hydrated and keep the planet thriving. It’s a raging vibe.",
        features: "Sparkling Water, No Artificial Sweeteners",
        writer: "Kelly",
        productImage: sparklingWater,
        background: banner2,
        backgroundColor: "#5D8469",
        tags: ["Mountain Water", "Bold Taste", "Eco-Friendly", "Eternally Recyclable Cans"],
        price: 50,
        currency: "$",
        productImages: [sparklingWater, drinnkingWater],
        category: "Water",               // Added category here

    },
];



const CheckOut = () => {
    const dispatch = useDispatch();
    const [loggedInuser, setloggedInuser] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedApp, setSelectedApp] = useState("");
    const [discountCode, setDiscountCode] = useState("");
    const [promoCode, setPromoCode] = useState("");
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('payNow'); // default selection

    const beverageCartItems = useSelector((state) => state.cart.items);
    const merchCartItems = useSelector((state) => state.merchCart.items);

    const cartItems = [...beverageCartItems, ...merchCartItems];


    useEffect(() => {
  if (showSuccessModal) {
    document.body.style.overflow = 'hidden'; // block scroll
  } else {
    document.body.style.overflow = 'auto';   // restore scroll
  }

  // Cleanup on unmount
  return () => {
    document.body.style.overflow = 'auto';
  };
}, [showSuccessModal]);


    console.log("CheckOut Items", cartItems)



    const navigate = useNavigate();


    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const deliveryCharges = 150;
    const currency = cartItems[0]?.currency || "₹";
    const discount = promoCode.trim().toLowerCase() === "save25" ? 25 : 0;

    // const applyPromo = () => {
    //     if (promoCode.trim().toLowerCase() === "save25") {
    //         setDiscount(25);
    //     } else if (promoCode.trim().toLowerCase() === "free") {
    //         setDiscount(deliveryCharges);
    //     } else {
    //         setDiscount(0);
    //     }
    // };

    const total = subtotal + deliveryCharges - discount;


    const handleApplyDiscount = () => {
        if (!discountCode.trim()) return;
        // Add your logic to validate and apply the discount
        console.log("Applying code:", discountCode);
    };

    // const filteredData = allData[selectedTab];

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        locality: '',
        landmark: '',
        pin: '',
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setloggedInuser(user);

            if (user.addresses?.length > 0) {
                // User has at least one address
                setSelectedAddressIndex(0); // select first address
                setFormData({
                    ...user.addresses[0],
                    email: user.email || ''
                });
            } else {
                // User has no addresses
                setSelectedAddressIndex('new'); // mark as new
                setFormData({
                    fullName: '',
                    phoneNumber: '',
                    email: user.email || '',
                    addressLine1: '',
                    addressLine2: '',
                    city: '',
                    state: '',
                    locality: '',
                    landmark: '',
                    pin: '',
                });
            }
        }
    }, []);



    const handleChange = (e) => {
        const { placeholder, value } = e.target;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    // const handleAddAddress = (e) => {
    //     e.preventDefault();

    //     console.log('Address Details:', formData);
    //     // You can also add form validation or API call here
    // };

    const handleAddAddress = async (e) => {
        e.preventDefault();

        if (!loggedInuser?.email) {
            console.error("User email is missing.");
            return;
        }

        // Prepare new address data from formData
        const newAddressData = {
            _key: uuidv4(),  // generate unique key
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            locality: formData.locality,
            landmark: formData.landmark,
            pin: Number(formData.pin), // make sure pin is number
        };

        try {
            // Fetch user document by email
            const customer = await sanityClient.fetch(
                `*[_type == "customer" && email == $email][0]{_id}`,
                { email: loggedInuser.email }
            );

            if (!customer?._id) {
                console.error("Customer not found.");
                return;
            }

            // Patch user doc by appending new address
            await sanityClient
                .patch(customer._id)
                .setIfMissing({ addresses: [] })
                .append('addresses', [newAddressData])
                .commit();

            console.log('Address added successfully!');

            await refreshLoggedInUser(loggedInuser.email, setloggedInuser);


            // // Optionally update local state to reflect new address
            // setloggedInuser((prev) => ({
            //     ...prev,
            //     addresses: [...(prev.addresses || []), newAddressData],
            // }));

            // Clear form or reset as needed
            setFormData({
                fullName: '',
                phoneNumber: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                locality: '',
                landmark: '',
                pin: '',
            });

            // Optionally reset selectedAddressIndex or close form
            setSelectedAddressIndex('new');
        } catch (error) {
            console.error('Failed to add address:', error.message);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();

        setFormData({
            fullName: '',
            email: '',
            phoneNumber: '',
            address: '',
            city: '',
            state: '',
            locality: '',
            landmark: '',
            pin: '',
        });
    };


    const paymentOptions = [
        {
            method: "Credit / Debit / ATM Card",
            content: (
                <div className={styles.cardPaymentContent}>
                    <input type="text" placeholder="Card Number" name="cardNumber" />

                    <div className={styles.row}>
                        <input type="text" placeholder="Expiry Date (MM/YY)" name="expiryDate" />
                        <input type="text" placeholder="CVV" name="cvv" />
                    </div>

                    <input type="text" placeholder="Name on the card" name="cardHolderName" />

                    {/* Pay button and total amount */}
                    <div className={styles.paySection}>
                        <button className={styles.payButton}>
                            Pay {cartItems.length > 0 ? cartItems[0].currency : '₹'}{subtotal.toFixed(2)}
                        </button>
                    </div>
                </div>
            )
        },
        {
            method: "UPI",
            content: (
                <div className={styles.upiSection}>
                    <div className={styles.radioOption}>
                        <div className={styles.radioContent}>
                            <div className={styles.inlineContent}>
                                <input
                                    type="radio"
                                    id="paytm"
                                    name="upiApp"
                                    value="paytm"
                                    checked={selectedApp === "paytm"}
                                    onChange={(e) => setSelectedApp(e.target.value)}
                                />
                                <label htmlFor="paytm">Paytm</label>
                            </div>
                            <img src={paytm} alt="Paytm" />
                        </div>
                        {selectedApp === "paytm" && (
                            <button className={styles.payButton}

                                onClick={() => {
                                    console.log("Pay button clicked");
                                    handleUpiPay(selectedApp, total)
                                }
                                }

                            >

                                Pay ₹{total.toFixed(2)}
                            </button>
                        )}
                    </div>

                    <div className={styles.radioOption}>
                        <div className={styles.radioContent}>
                            <div className={styles.inlineContent}>
                                <input
                                    type="radio"
                                    id="gpay"
                                    name="upiApp"
                                    value="gpay"
                                    checked={selectedApp === "gpay"}
                                    onChange={(e) => setSelectedApp(e.target.value)}
                                />
                                <label htmlFor="gpay">Google Pay</label>
                            </div>
                            <img src={gpay} alt="Google Pay" />
                        </div>
                        {selectedApp === "gpay" && (
                            <button className={styles.payButton}
                                onClick={() => handleUpiPay(selectedApp, total)}
                            >
                                Pay ₹{total.toFixed(2)}
                            </button>
                        )}
                    </div>

                    <div className={styles.radioOption}>
                        <div className={styles.radioContent}>
                            <div className={styles.inlineContent}>
                                <input
                                    type="radio"
                                    id="phonepe"
                                    name="upiApp"
                                    value="phonepe"
                                    checked={selectedApp === "phonepe"}
                                    onChange={(e) => setSelectedApp(e.target.value)}
                                />
                                <label htmlFor="phonepe">PhonePe</label>
                            </div>
                            <img src={phonepay} alt="PhonePe" />
                        </div>
                        {selectedApp === "phonepe" && (
                            <button className={styles.payButton}
                                onClick={() => handleUpiPay(selectedApp, total)}
                            >
                                Pay ₹{total.toFixed(2)}
                            </button>
                        )}
                    </div>
                </div>
            )
        },

        {
            method: "Cash on Delivery",
            content: (
                <div className={styles.codContent}>
                    <p>You can pay in cash when your order is delivered. No further steps are required at this time.</p>
                    <button className={styles.payButton}>Place Order</button>
                </div>
            )
        }
    ];

    const getBaseId = (compoundId) => {
        if (typeof compoundId === 'string' && compoundId.includes('-')) {
            return compoundId.split('-')[0];
        }
        return String(compoundId); // fallback for raw number IDs
    };

    const cartCategories = [
        ...new Set(
            cartItems
                .map((item) => {
                    const baseId = getBaseId(item.id);
                    const prod = products.find((p) => String(p.id) === baseId);
                    return prod?.category?.trim().toLowerCase() || null;
                })
                .filter(Boolean)
        ),
    ];

    const similarProducts = products.filter((prod) => {
        const category = prod.category?.trim().toLowerCase();
        const inCart = cartItems.some((item) => getBaseId(item.id) === String(prod.id));
        return cartCategories.includes(category) && !inCart;
    });


    const getCountryFromPhone = (phone) => {
        if (!phone) return 'in'; // default country when empty
        if (phone.startsWith('+91')) return 'in';
        if (phone.startsWith('+1')) return 'us';
        // add more as needed
        return 'in'; // fallback
    };

    const country = getCountryFromPhone(formData.phoneNumber);

    const razorpayRef = useRef();

    const handlePayment = () => {
        if (razorpayRef.current) {
            razorpayRef.current.initiatePayment();
        }
    };

    const handlePaymentSuccess = async (fullData) => {
        console.log("✅ Payment full data:", fullData);

        const {
            fullName,
            email,
            contact,
            addressLine1,
            addressLine2,
            city,
            state,
            locality,
            landmark,
            pin,
            payment,
            orderId,
        } = fullData;

        const { razorpay_payment_id } = payment || {};

        if (!razorpay_payment_id) {
            console.warn("⚠️ Missing payment ID");
            alert("Payment verified but no payment ID found.");
            return;
        }

        if (!razorpay_payment_id) {
            console.warn("⚠️ Missing payment ID");
            alert("Payment verified but no payment ID found.");
            return;
        }

        const orderDoc = {
            _type: 'order',
            // Order Details
            orderId,
            paymentId: razorpay_payment_id,
            status: "ordered",
            // Shipping Details
            name: `${fullName}`,
            email,
            contact,
            addressLine1,
            addressLine2,
            city,
            state,
            locality,
            landmark,
            subtotalPrice: Number(subtotal),
            deliveryCharges: Number(deliveryCharges),
            discountCharges: Number(discount),
            pin: Number(pin),
            totalPrice: Number(total),
            paymentMode: "payment online",
            // Products
            //     products: cartItems.map((item) => ({
            //         _key: uuidv4(), // ✅ Required for Sanity array items
            //         id: item.id,
            //         name: item.name,
            //         price: item.price,
            //         quantity: item.quantity,
            //         packSize: item.packSize,
            //         currency: item.currency,
            //         productImage: item.productImage,
            //     })),

            //     // Timestamp
            //     submittedAt: new Date().toISOString(),
            // };
            products: cartItems.map((item) => {
                if (item.type === "beverage") {
                    return {
                        _key: uuidv4(),
                        _type: "beverage",
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        packSize: item.packSize,
                        currency: item.currency,
                        productImage: item.productImage,
                    };
                } else if (item.type === "merch") {
                    return {
                        _key: uuidv4(),
                        _type: "merch",
                        id: item.id,  // ✅ consistent now
                        merchName: item.merchName, // merchName mapped to 'name'
                        price: item.price,
                        quantity: item.quantity,
                        currency: item.currency,
                        selectedSize: item.selectedSize,
                        selectedColor: item.selectedColor,
                        productImage: item.productImage,
                    };
                }
            }),
            submittedAt: new Date().toISOString(),
        };

        try {
            const result = await sanityClient.create(orderDoc);
            console.log('📦 Order saved to Sanity:', result);

            // alert("🎉 Payment Successful and Order Saved!");

            await decreaseProductStock(cartItems);


            setShowSuccessModal(true);


            // ✅ Clear the cart after successful order
            dispatch(clearCart());
        } catch (error) {
            console.error("❌ Failed to save order:", error);
            alert("Payment succeeded, but saving order failed.");
        }
    };

    const handleCOD = async () => {
        const {
            fullName,
            phoneNumber,
            addressLine1,
            addressLine2,
            city,
            state,
            locality,
            landmark,
            pin,
        } = formData;

        const orderId = `order_${nanoid(14)}`; // e.g., order_R9rY8kCABvgZY3


        const orderDoc = {
            _type: 'order',
            orderId: orderId,
            paymentId: "COD",
            status: "ordered",
            name: `${fullName}`,
            email: loggedInuser?.email,
            contact: phoneNumber.startsWith('91') ? phoneNumber.slice(2) : phoneNumber,
            addressLine1,
            addressLine2,
            city,
            state,
            locality,
            landmark,
            pin: Number(pin),
            subtotalPrice: Number(subtotal),
            deliveryCharges: Number(deliveryCharges),
            discountCharges: Number(discount),
            totalPrice: Number(total),
            paymentMode: "cash on delivery",
            // products: cartItems.map((item) => ({
            //     _key: uuidv4(),
            //     id: item.id,
            //     name: item.name,
            //     price: item.price,
            //     quantity: item.quantity,
            //     packSize: item.packSize,
            //     currency: item.currency,
            //     productImage: item.productImage,
            // })),
            products: cartItems.map((item) => {
                if (item.type === "beverage") {
                    return {
                        _key: uuidv4(),
                        _type: "beverage",
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        packSize: item.packSize,
                        currency: item.currency,
                        productImage: item.productImage,
                    };
                } else if (item.type === "merch") {
                    return {
                        _key: uuidv4(),
                        _type: "merch",
                        id: item.id,  // ✅ consistent now
                        merchName: item.merchName, // merchName mapped to 'name'
                        price: item.price,
                        quantity: item.quantity,
                        currency: item.currency,
                        selectedSize: item.selectedSize,
                        selectedColor: item.selectedColor,
                        productImage: item.productImage,
                    };
                }
            }),
            submittedAt: new Date().toISOString(),
        };

        try {
            const result = await sanityClient.create(orderDoc);
            console.log('📦 COD Order saved to Sanity:', result);


            await decreaseProductStock(cartItems);


            setShowSuccessModal(true); // or redirect to confirmation page
            dispatch(clearCart()); // clear the cart
        } catch (error) {
            console.error("❌ Failed to save COD order:", error);
            alert("Failed to place COD order.");
        }
    };

    const decreaseProductStock = async (cartItems) => {
        try {
            for (const item of cartItems) {

                // Determine the type
                const type = item.type === 'beverage' ? 'beverages' : 'merch';

                // Fetch the product by a field that matches your cart item (e.g., productName or slug)
                const product = await sanityClient.fetch(
                    `*[_type == $type && productName == $name][0]`,
                    { type, name: item.name } // match by productName
                );

                console.log("Sanity Product", product)

                if (!product) continue;

                let patchData = {};

                if (type === 'beverages') {
                    // Decrement stock based on packSize
                    if (item.packSize === 4 && product.stockpack4 >= item.quantity) {
                        patchData.stockpack4 = product.stockpack4 - item.quantity;
                    } else if (item.packSize === 6 && product.stockpack6 >= item.quantity) {
                        patchData.stockpack6 = product.stockpack6 - item.quantity;
                    } else if (item.packSize === 12 && product.stockpack12 >= item.quantity) {
                        patchData.stockpack12 = product.stockpack12 - item.quantity;
                    } else {
                        console.warn(`⚠️ Insufficient stock for ${product.productName} Pack of ${item.packSize}`);
                        continue;
                    }
                }
                else if (type === 'merch') {
                    const variant = product.variants.find(
                        v => v.productType === 'Cloth' && v.merchColor.hex === item.selectedColor
                    );

                    if (!variant) {
                        console.warn(`⚠️ No variant found for color ${item.selectedColor}`);
                        continue;
                    }

                    const sizeObj = variant.clothSizes.find(s => s.sizeName === item.selectedSize);

                    if (!sizeObj) {
                        console.warn(`⚠️ No size found for ${item.selectedSize}`);
                        continue;
                    }

                    if (sizeObj.stock >= item.quantity) {
                        sizeObj.stock -= item.quantity;
                    } else {
                        console.warn(`⚠️ Insufficient stock for ${product.merchName} ${item.selectedSize}`);
                        continue;
                    }

                    // Patch back to Sanity
                    await sanityClient
                        .patch(product._id)
                        .set({ variants: product.variants })
                        .commit();
                }

                // Patch the product in Sanity
                await sanityClient.patch(product._id).set(patchData).commit();

                console.log(`✅ Stock updated for ${product.productName}:`, patchData);
            }
        } catch (error) {
            console.error('❌ Failed to update product stock:', error);
        }
    };



    const handlePaymentFailure = (message) => {
        console.error("❌ Payment failed:", message);
        alert(message);
    };


    const validateForm = () => {
        const {
            fullName,
            // email,
            phoneNumber,
            addressLine1,
            addressLine2,
            city,
            state,
            // locality,
            pin
        } = formData;

        // Basic presence checks
        if (
            !fullName?.trim() ||
            // !email?.trim() ||
            !phoneNumber?.trim() ||
            !addressLine1?.trim() ||
            !addressLine2?.trim() ||
            !city?.trim() ||
            !state?.trim()
            // !locality?.trim()
        ) {
            alert("Please fill in all shipping details fields.");
            return false;
        }

        // Validate pin
        if (!/^\d{6}$/.test(pin)) {
            alert("Pin must be exactly 6 digits.");
            return false;
        }

        // // (Optional) validate email pattern
        // if (!/^\S+@\S+\.\S+$/.test(email)) {
        //     alert("Please enter a valid email address.");
        //     return false;
        // }

        // (Optional) validate phone length (basic)
        if (phoneNumber.length < 10) {
            alert("Please enter a valid phone number.");
            return false;
        }

        return true;
    };

    return (
        <div className={styles.checkoutContainer}>
            {/* Left Section */}
            <div className={styles.leftSection}>
                <h2>Shipping Details</h2>
                <form className={styles.checkoutForm}>

                    {loggedInuser && (
                        <div className={styles.inlineFields}>
                            <label>
                                Select Address
                                <select
                                    name="selectedAddress"
                                    value={selectedAddressIndex}
                                    onChange={(e) => {
                                        const selectedValue = e.target.value;

                                        if (selectedValue === 'new') {
                                            // Clear form for new address entry
                                            setSelectedAddressIndex('new');
                                            setFormData((prev) => ({
                                                ...prev,
                                                fullName: '',
                                                phoneNumber: '',
                                                addressLine1: '',
                                                addressLine2: '',
                                                city: '',
                                                state: '',
                                                locality: '',
                                                landmark: '',
                                                pin: '',
                                            }));
                                        } else {
                                            const selectedIndex = Number(selectedValue);
                                            setSelectedAddressIndex(selectedIndex);
                                            const selectedAddress = loggedInuser?.addresses?.[selectedIndex];
                                            if (selectedAddress) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    ...selectedAddress,
                                                }));
                                            }
                                        }
                                    }}
                                >
                                    {/* Map existing addresses if any */}
                                    {loggedInuser?.addresses?.length > 0 &&
                                        loggedInuser.addresses.map((address, index) => (
                                            <option key={index} value={index}>
                                                {address.addressLine1}, {address.addressLine2}, {address.city}, {address.state}
                                            </option>
                                        ))}

                                    {/* Always include Add New Address option */}
                                    <option key="new">+ Add New Address</option>
                                </select>
                            </label>
                        </div>
                    )}

                    <div className={styles.inlineFields}>
                        <label>
                            Full Name
                            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                        </label>
                    </div>

                    {/* Email & Phone */}
                    <div className={styles.inlineFields}>
                        {/* <label>
                            Email
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        </label> */}

                        <label>
                            Phone Number
                            {/* <input type="tel" name="phone" placeholder="+91 1234567890" value={formData.phoneNumber} onChange={handleChange} /> */}
                            <PhoneInput
                                country={country}
                                value={formData.phoneNumber}
                                onChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        phoneNumber: value,
                                    }))
                                }
                                containerStyle={{
                                    width: "100%",
                                }}
                                inputStyle={{
                                    borderRadius: "4px",
                                    width: "100%",
                                    height: "100%",
                                    fontSize: "15px",
                                    textTransform: "capitalize",
                                    paddingLeft: "45px",

                                }}
                                enableSearch
                                countryCodeEditable={false}
                                placeholder={country === 'in' ? '+91 1234567890' : undefined}
                                required

                            />
                        </label>
                    </div>

                    {/* Address */}
                    <div className={styles.inlineFields}>
                        <label>
                            Flat, House Number
                            <textarea name="addressLine1" placeholder="Flat, House Number" value={formData.addressLine1} onChange={handleChange} required />
                        </label>
                    </div>

                    <div className={styles.inlineFields}>
                        <label>
                            Apartment, Area, Sector, Village
                            <textarea name="addressLine2" placeholder="Apartment, Area, Sector, Village" value={formData.addressLine2} onChange={handleChange} required />
                        </label>
                    </div>

                    {/* Locality & Landmark */}
                    <div className={styles.inlineFields}>
                        <label>
                            PIN Code
                            <input
                                type="text"
                                name="pin"
                                placeholder="Pin Code"
                                value={formData.pin}
                                maxLength={6}        // Limit length to 6 characters
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Allow only digits and max 6 chars
                                    if (/^\d{0,6}$/.test(value)) {
                                        handleChange(e);
                                    }
                                }}
                                required
                            />
                        </label>
                        {/* <label>
                            Flat No/Locality
                            <input type="text" name="locality" placeholder="Flat No/Locality" value={formData.locality} onChange={handleChange} required />
                        </label> */}
                    </div>

                    {/* City & State */}
                    <div className={styles.inlineFields}>
                        <label>
                            City/ District / Town
                            <input type="text" name="city" placeholder="City/District/town" value={formData.city} onChange={handleChange} required />
                        </label>
                        <label>
                            State
                            <select name="state" value={formData.state} className={styles.inlineFields} onChange={handleChange} required>
                                <option value="">Select state</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                            </select>
                        </label>
                    </div>
                    {/* <div className={styles.inlineFields}>
                        <label>
                            Landmark (Optional)
                            <input type="text" name="landmark" placeholder="landmark (optional)" value={formData.landmark} onChange={handleChange} required />
                        </label>
                    </div> */}

                    {/* Conditionally show buttons only when 'new' is selected */}
                    {selectedAddressIndex === 'new' && (
                        <div className={styles.buttonGroup}>
                            <button className={styles.addButton} onClick={handleAddAddress}>
                                Add Address
                            </button>
                            <button className={styles.cancelButton} onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    )}

                    {/* <h2 className={styles.paymentHeading}>Payment</h2> */}

                    {/* <div className={styles.accordionContainer}>
                        {paymentOptions.map((option, index) => (
                            <div key={index} className={styles.accordionItem}>
                                <div
                                    className={styles.accordionTitle}
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span>{option.method}</span>
                                    <FaChevronDown
                                        className={`${styles.icon} ${openIndex === index ? styles.rotate : ''}`}
                                    />
                                </div>
                                {openIndex === index && (
                                    <div className={styles.accordionContent}>{option.content}</div>
                                )}
                            </div>
                        ))}
                    </div> */}

                </form>
            </div>


            {/* Right Section */}
            <div className={styles.rightSection}>
                <h2>Order Summary</h2>

                <div className={styles.scrollableContainer}>
                    <ul className={styles.cartList}>
                        {cartItems.map((item) => (
                            <li key={item.id} className={styles.cartItem}>
                                <div className={styles.itemImageWrapper}>
                                    <img
                                        src={item.productImage}
                                        alt={item.productName}
                                        className={styles.itemImage}
                                    />

                                    <span className={styles.quantityBadge}>{item.quantity}</span>

                                </div>
                                <div className={styles.itemDetails}>
                                    <div className={styles.itemName}>
                                        {item.name}
                                    </div>

                                    <div className={styles.itemPrice}>
                                        {item.packSize > 1 ? ` Pack of ${item.packSize}` : ""}
                                    </div>

                                    <div className={styles.itemPrice}>
                                        {item.currency}
                                        {(item.price * item.quantity).toFixed(2)}
                                    </div>

                                    {/* <div className={styles.itemControls}>
                                        <div className={styles.quantityControls}>
                                            <button
                                                onClick={() => dispatch(decreaseQuantity(item.id))}
                                                className={styles.quantityBtn}
                                                disabled={item.quantity === 1}  // disable when quantity is 1

                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch(increaseQuantity(item.id))}
                                                className={styles.quantityBtn}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className={styles.removeIcon}
                                            aria-label="Remove item"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div> */}
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.discountWrapper}>
                        <input
                            type="text"
                            placeholder="Enter discount code"
                            className={styles.discountInput}
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                        />
                        <button
                            className={styles.applyButton}
                            onClick={handleApplyDiscount}
                        >
                            Apply
                        </button>
                    </div>

                    <div className={styles.summaryWrapper}>
                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>{currency}{subtotal.toFixed(2)}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Delivery Charges</span>
                            <span>{currency}{deliveryCharges.toFixed(2)}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Discount</span>
                            <span>{currency}{discount.toFixed(2)}</span>
                        </div>

                        <hr className={styles.summaryDivider} />

                        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                            <span>Total</span>
                            <span>{currency}{total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className={styles.importantNote}>
                        The total amount you pay includes all applicable customs duties & taxes.
                        <br />
                        <strong>We guarantee no additional charges on delivery.</strong>
                    </div>

                    <div className={styles.radioOption}>
                        <h3 className={styles.sectionHeading}>Payment Options</h3>

                        <div className={styles.radioContent}>
                            <div className={styles.inlineContent}>
                                <input
                                    type="radio"
                                    id="payNow"
                                    name="paymentMethod"
                                    value="payNow"
                                    checked={paymentMethod === "payNow"}
                                    onChange={() => setPaymentMethod("payNow")}
                                />
                                <label htmlFor="payNow">Pay Now</label>
                            </div>
                        </div>

                        <div className={styles.radioContent}>
                            <div className={styles.inlineContent}>
                                <input
                                    type="radio"
                                    id="cod"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={paymentMethod === "cod"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label htmlFor="cod">Cash on delivery(COD)</label>
                            </div>
                        </div>
                    </div>

                    {paymentMethod === 'payNow' && (
                        <button
                            className={styles.payButton}
                            onClick={() => {
                                if (validateForm()) {
                                    handlePayment(); // only runs if form is valid
                                }
                            }}
                        >
                            Pay {cartItems.length > 0 ? cartItems[0].currency : '₹'}
                            {total.toFixed(2)}
                        </button>
                    )}
                    {paymentMethod === 'cod' && (
                        <button
                            className={styles.payButton}
                            onClick={() => {
                                if (validateForm()) {
                                    handleCOD(); // you need to define this
                                }
                            }}
                        >
                            Confirm Order ({cartItems.length > 0 ? cartItems[0].currency : '₹'}
                            {total.toFixed(2)})
                        </button>
                    )}

                    {/* 🧾 Razorpay Payment Component */}
                    <RazorpayPayment
                        ref={razorpayRef}
                        amount={total}
                        onSuccess={handlePaymentSuccess}
                        onFailure={handlePaymentFailure}
                        customerData={{
                            fullName: formData.fullName,
                            email: loggedInuser?.email,
                            contact: formData.phoneNumber.startsWith('91')
                                ? formData.phoneNumber.slice(2)
                                : formData.phoneNumber,
                            addressLine1: formData.addressLine1,
                            addressLine2: formData.addressLine2,
                            city: formData.city,
                            state: formData.state,
                            locality: formData.locality,
                            landmark: formData.landmark,
                            pin: formData.pin
                        }}
                    />

                    {showSuccessModal && (
                        <div className={styles.modalOverlay}>
                            <div className={styles.modalContent}>
                                <div className={styles.checkIconWrapper}>
                                    <FaCheckCircle className={styles.checkIcon} />
                                </div>

                                <h2 className={styles.congratsText}>Congratulations!</h2>
                                <p className={styles.confirmationTitle}>Your Order is Confirmed!</p>
                                <p className={styles.confirmationSubtext}>
                                    We’ll send you a shipping confirmation<br />
                                    as soon as your order ships.
                                </p>

                                <button
                                    onClick={() => {
                                        setShowSuccessModal(false);
                                        navigate('/'); // 👈 navigate to home
                                    }}
                                    className={styles.closeButton}
                                >
                                    Go to Home
                                </button>
                            </div>
                        </div>
                    )}


                    {/* Similar Section */}
                    {/* <div className={styles.similarProductsSection}>
                        <h3>Similar Products</h3>
                        <div className={styles.similarProductsList}>
                            {similarProducts.length === 0 && <p>No similar products found.</p>}
                            {similarProducts.map((prod) => (
                                <div key={prod.id} className={styles.similarProductItem}>
                                    <img
                                        src={prod.productImage}
                                        alt={prod.productName}
                                        className={styles.similarProductImage}
                                    />

                                    <div className={styles.productInfo}>
                                        <p className={styles.productName}>{prod.productName}</p>
                                        <p className={styles.productPrice}>{prod.currency}{prod.price.toFixed(2)}</p>
                                        <button
                                            className={styles.buyNowButton}
                                            onClick={() =>
                                                dispatch(
                                                    addToCart({
                                                        ...prod,
                                                        id: `${prod.id}-1`,
                                                        packSize: 1,
                                                        quantity: 1,
                                                        price: Number(prod.price) * 1,
                                                    })
                                                )
                                            }
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>

            </div>

        </div>
    );
};

export default CheckOut;
