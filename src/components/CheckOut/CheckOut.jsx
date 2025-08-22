import React, { useRef, useState } from "react";
import styles from "./CheckOut.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown } from "react-icons/fa";

import paytm from "../../assets/paytm.png"
import gpay from "../../assets/gpay.png"
import phonepay from "../../assets/phonepay.png"
import { FiTrash2 } from "react-icons/fi";

import sparklingWater from "../../assets/sparkling-water.png"
import drinnkingWater from "../../assets/drinking-water.png"

import banner1 from "../../assets/banner1.png"
import banner2 from "../../assets/banner2.png"

import {
    addToCart,
    toggleCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} from "../../redux/cartSlice"; // Update with your actual path
import { handleUpiPay } from "../Payments/Payments";
import { useEffect } from "react";

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Don't forget the styles
import { sanityClient } from "../../utils/sanityClient";
import { v4 as uuidv4 } from 'uuid';
import { refreshLoggedInUser } from "../../utils/refreshUser";
import RazorpayPayment from "../RazorPay/RazorPay";



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
    const cartItems = useSelector((state) => state.cart.items);
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedApp, setSelectedApp] = useState("");
    const [discountCode, setDiscountCode] = useState("");
    const [promoCode, setPromoCode] = useState("");
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);



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
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        addressLine: '',
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
            console.log('User loaded from localStorage:', user); // This logs the user

            setloggedInuser(user);


            const firstAddress = user.addresses && Array.isArray(user.addresses) && user.addresses.length > 0
                ? user.addresses[0]
                : {};

            setFormData({
                // From user object
                firstName: firstAddress.firstName || '',
                lastName: firstAddress.lastName || '',
                email: user.email || '',
                phoneNumber: firstAddress.phoneNumber || '',
                // From first address
                addressLine: firstAddress.addressLine || '',
                city: firstAddress.city || '',
                state: firstAddress.state || '',
                locality: firstAddress.locality || '',
                landmark: firstAddress.landmark || '',
                pin: firstAddress.pin || '',
            });
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
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
            addressLine: formData.addressLine,
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
                firstName: '',
                lastName: '',
                phoneNumber: '',
                addressLine: '',
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
            firstName: '',
            lastName: '',
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

    const handlePaymentSuccess = ({ response, order_id }) => {
        console.log("✅ Payment successful:", response);
        console.log("💾 Order ID:", order_id);

        // Optional: Save payment details to DB or Sanity here

        alert("Payment Successful!");
    };

    const handlePaymentFailure = (message) => {
        console.error("❌ Payment failed:", message);
        alert(message);
    };

    return (
        <div className={styles.checkoutContainer}>
            {/* Left Section */}
            <div className={styles.leftSection}>
                <h2>Shipping Details</h2>
                <form className={styles.checkoutForm}>

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
                                            firstName: '',
                                            lastName: '',
                                            phoneNumber: '',
                                            addressLine: '',
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
                                {loggedInuser?.addresses?.map((address, index) => (
                                    <option key={index} value={index}>
                                        {address.addressLine}, {address.city}, {address.state}
                                    </option>
                                ))}

                                <option value="new">+ Add New Address</option>
                            </select>
                        </label>
                    </div>


                    <div className={styles.inlineFields}>
                        <label>
                            First Name
                            <input type="text" name="firstName" placeholder="Firstname" value={formData.firstName} onChange={handleChange} />
                        </label>
                        <label>
                            Last Name
                            <input type="text" name="lastName" placeholder="Lastname" value={formData.lastName} onChange={handleChange} />
                        </label>
                    </div>

                    {/* Email & Phone */}
                    <div className={styles.inlineFields}>
                        <label>
                            Email
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                        </label>

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
                                inputStyle={{ width: '100%' }}
                                enableSearch
                                placeholder={country === 'in' ? '+91 1234567890' : undefined}

                            />
                        </label>
                    </div>

                    {/* Address */}
                    <label className={styles.inlineFields}>
                        Address
                        <textarea name="addressLine" placeholder="address (Area and street)" value={formData.addressLine} onChange={handleChange} />
                    </label>

                    {/* City & State */}
                    <div className={styles.inlineFields}>
                        <label>
                            City / Town
                            <input type="text" name="city" placeholder="City/district/town" value={formData.city} onChange={handleChange} />
                        </label>
                        <label>
                            State
                            <select name="state" value={formData.state} className={styles.inlineFields} onChange={handleChange}>
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

                    {/* Locality & Landmark */}
                    <div className={styles.inlineFields}>
                        <label>
                            Locality
                            <input type="text" name="locality" placeholder="Locality" value={formData.locality} onChange={handleChange} />
                        </label>
                        <label>
                            Pin
                            <input
                                type="text"
                                name="pin"
                                placeholder="Pin"
                                value={formData.pin}
                                maxLength={6}        // Limit length to 6 characters
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Allow only digits and max 6 chars
                                    if (/^\d{0,6}$/.test(value)) {
                                        handleChange(e);
                                    }
                                }}
                            />
                        </label>
                    </div>
                    <label>
                        Landmark
                        <input type="text" name="landmark" placeholder="landmark (optional)" value={formData.landmark} onChange={handleChange} />
                    </label>

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

                    {/* <h2 className={styles.paymentHeading}>Payment</h2>

                    <div className={styles.accordionContainer}>
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
                                </div>
                                <div className={styles.itemDetails}>
                                    <div className={styles.itemName}>
                                        {item.name} {item.packSize > 1 ? `/ Pack of ${item.packSize}` : ""}
                                    </div>

                                    <div className={styles.itemPrice}>
                                        {item.currency}
                                        {(item.price * item.quantity).toFixed(2)}
                                    </div>

                                    <div className={styles.itemControls}>
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
                                    </div>
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

                    <button className={styles.payButton} onClick={handlePayment}>
                        Pay {cartItems.length > 0 ? cartItems[0].currency : '₹'}{total.toFixed(2)}
                    </button>

                    {/* 🧾 Razorpay Payment Component */}
                    <RazorpayPayment
                        ref={razorpayRef}
                        amount={total}
                        onSuccess={handlePaymentSuccess}
                        onFailure={handlePaymentFailure}
                        customerData={{
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: loggedInuser?.email,
                            contact: formData.phoneNumber.startsWith('91')
                                ? formData.phoneNumber.slice(2)
                                : formData.phoneNumber,
                            addressLine: formData.addressLine,
                            city: formData.city,
                            state: formData.state,
                            locality: formData.locality,
                            landmark: formData.landmark,
                            pin: formData.pin
                        }}
                    />

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
