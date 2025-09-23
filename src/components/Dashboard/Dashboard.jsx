import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { HiOutlineClipboardList, } from "react-icons/hi";
import { IoIosArrowForward, } from "react-icons/io";
import { FaTrash, FaUser } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import OrderProductList from "../OrderProductsList/OrderProductList";
import { useEffect } from "react";

import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { sanityClient } from "../../utils/sanityClient";
import { v4 as uuidv4 } from 'uuid';


const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [editMode, setEditMode] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [showOrderFilters, setShowOrderFilters] = useState(false);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [selectedDateFilters, setSelectedDateFilters] = useState([]);
    const [addressData, setAddressData] = useState([]);


    const navigate = useNavigate();

    const { state } = useLocation();
    const user = state?.user;

    const [editFields, setEditFields] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
    });

    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phoneNumber || "", // leave empty if not present
    });

    const updateUserInSanity = async (userId, updatedFields) => {
        try {
            const updatedUser = await sanityClient
                .patch(userId)
                .set(updatedFields)
                .commit();

            console.log("User updated:", updatedUser);

            // Update localStorage as well
            localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const toggleEdit = async (field) => {
        if (editFields[field]) {
            // Save mode - update user data
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const userId = storedUser?._id;

            if (!userId) {
                console.error("No userId found in localStorage");
                return;
            }

            const updatedFields = {};

            if (field === "personalInfo") {
                updatedFields.firstName = formData.firstName;
                updatedFields.lastName = formData.lastName;
            } else if (field === "phone") {
                updatedFields.phoneNumber = formData.phone;
            }

            try {
                await updateUserInSanity(userId, updatedFields);
                // Optionally show a success message here
            } catch (err) {
                console.error("Update failed:", err);
                // Optionally show an error message here
                return; // Don't toggle off edit mode if update fails
            }
        }

        // Toggle the edit mode for the field (on/off)
        setEditFields((prev) => ({ ...prev, [field]: !prev[field] }));
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [newAddress, setNewAddress] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: '', // update your form and handler too
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        locality: "",
        landmark: "",
        pin: "",
    });


    const handleAddAddress = () => {
        setShowAddressForm(true);
    };

    const handleDeleteAddress = async (keyToDelete) => {
        if (!user?._id) {
            console.error("User ID not found");
            return;
        }

        try {
            await sanityClient
                .patch(user._id)
                .unset([`addresses[_key=="${keyToDelete}"]`]) // <--- delete by _key
                .commit();

            console.log("Address deleted successfully");

            // Optionally, refetch or locally filter address data
            setAddressData(prev => ({
                addresses: prev.addresses.filter(addr => addr._key !== keyToDelete)
            }));
        } catch (err) {
            console.error("Failed to delete address:", err);
        }
    };



    const handleInputChange = (eOrName, value) => {
        if (typeof eOrName === 'string') {
            // Case: from PhoneInput
            const name = eOrName;
            setNewAddress((prev) => ({ ...prev, [name]: value }));
        } else {
            const { name, value } = eOrName.target;
            setNewAddress((prev) => ({ ...prev, [name]: value }));
        }
    };


    // Add this handler for form submission to add new address
    const handleSubmitNewAddress = async (e) => {
        e.preventDefault();

        if (!user?.email) {
            console.error("User email is missing.");
            return;
        }

        const newAddressData = {
            _key: uuidv4(),
            firstName: newAddress.firstName,
            lastName: newAddress.lastName,
            phoneNumber: newAddress.phoneNumber,
            addressLine1: newAddress.addressLine1,
            addressLine2: newAddress.addressLine2,
            city: newAddress.city,
            state: newAddress.state,
            locality: newAddress.locality,
            landmark: newAddress.landmark,
            pin: Number(newAddress.pin), // Convert pin to number
        };

        console.log('New Address', newAddress);

        try {
            // ✅ Fetch the customer using the email
            const customer = await sanityClient.fetch(
                `*[_type == "customer" && email == $email][0]{_id}`,
                { email: user.email }
            );

            if (!customer?._id) {
                console.error("Customer not found.");
                return;
            }

            // ✅ Now patch the customer document
            await sanityClient
                .patch(customer._id)
                .setIfMissing({ addresses: [] })
                .append('addresses', [newAddressData])
                .commit();

            console.log('Address added to Sanity!');

            // Update local state
            setAddressData((prev) => ({
                ...prev,
                addresses: [...prev.addresses, newAddressData],
            }));

            // Clear form
            setNewAddress({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                locality: '',
                landmark: '',
                pin: '',
            });

            setShowAddressForm(false);
        } catch (err) {
            console.error('Failed to add address:', err.message);
        }
    };

    useEffect(() => {
        async function fetchCustomerAddresses() {
            if (!user?.email) return;

            try {
                const customer = await sanityClient.fetch(
                    `*[_type == "customer" && email == $email][0]{
          _id,
          addresses
        }`,
                    { email: user.email }
                );

                if (customer) {
                    setAddressData({ addresses: customer.addresses || [] });
                } else {
                    console.error("Customer not found");
                }
            } catch (err) {
                console.error("Failed to fetch addresses:", err);
            }
        }

        fetchCustomerAddresses();
    }, [user?.email]);




    // Cancel button handler
    const handleCancelNewAddress = () => {
        setShowAddressForm(false);
    };

    const handleStatusChange = (e) => {
        const { value, checked } = e.target;
        setSelectedStatuses((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };

    const handleDateFilterChange = (e) => {
        const { value, checked } = e.target;
        setSelectedDateFilters((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/sign-in"); // Redirect to sign-in page
    };


    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardWrapper}>
                <div className={styles.sidebar}>
                    <div className={styles.userContainer}>
                        <h2 className={styles.heading}>Hello,</h2>
                        <p className={styles.userName}>{user?.firstName} {user?.lastName}</p>
                    </div>
                    <div className={styles.accountWrapper}>
                        {/* My Orders Block */}
                        <div
                            className={`${styles.menuItem} ${activeTab === "products" ? styles.activeTab : ""}`}
                            onClick={() => {
                                if (activeTab === "products" && showOrderFilters) {
                                    // Closing the "My Orders" tab — switch back to profile
                                    setShowOrderFilters(false);
                                    setActiveTab("profile");
                                } else {
                                    // Opening the "My Orders" tab
                                    setActiveTab("products");
                                    setShowOrderFilters(true);
                                }
                            }}
                        >
                            <div className={styles.leftSection}>
                                <HiOutlineClipboardList className={styles.menuIcon} />
                                <span className={styles.orders}>My Orders</span>
                            </div>
                            <IoIosArrowForward className={`${styles.arrow} ${showOrderFilters ? styles.arrowOpen : ""}`} />
                        </div>
                        <div className={styles.menuDivider}></div>

                        {showOrderFilters && (
                            <div className={styles.orderFilters}>
                                <h3 className={styles.filterHeading}>Order Status</h3>
                                <div className={styles.checkboxGroup}>
                                    {["Ordered", "On the Way", "Delivered", "Cancelled", "Returned"].map((status) => (
                                        <label key={status} className={styles.checkboxLabel}>
                                            <input type="checkbox" className={styles.statusCheckbox}
                                                value={status.toLowerCase()}
                                                checked={selectedStatuses.map(s => s.toLowerCase()).includes(status.toLowerCase())}
                                                onChange={handleStatusChange} />
                                            <span>{status}</span>
                                        </label>
                                    ))}
                                </div>

                                <h3 className={styles.filterHeading}>Order Date</h3>
                                <div className={styles.dateFilterGroup}>
                                    {["Last 30 Days", "2024", "2023", "Older"].map((dateFilter) => (
                                        <label key={dateFilter} className={styles.checkboxLabel}>
                                            <input type="checkbox" className={styles.statusCheckbox}
                                                value={dateFilter}
                                                checked={selectedDateFilters.includes(dateFilter)}
                                                onChange={handleDateFilterChange} />
                                            <span>{dateFilter}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}


                        {/* Account Section */}
                        <div className={styles.accountSection}>
                            <div className={styles.menuItem}>
                                <div className={styles.leftSection}>
                                    <FaUser className={styles.menuIcon} />
                                    <span className={styles.orders}>My Account</span>
                                </div>
                            </div>
                            <ul className={styles.accountList} role="list" aria-label="Account options">
                                <li
                                    tabIndex={0}
                                    className={`${styles.accountListItem} ${activeTab === "profile" ? styles.activeTab : ""}`}
                                    onClick={() => setActiveTab("profile")}
                                >
                                    Profile Information
                                </li>
                                <li
                                    tabIndex={0}
                                    className={`${styles.accountListItem} ${activeTab === "addresses" ? styles.activeTab : ""}`}
                                    onClick={() => setActiveTab("addresses")}
                                >
                                    Manage Addresses
                                </li>
                            </ul>
                        </div>
                        <div className={styles.menuDivider}></div>
                        <div className={styles.menuItem}>
                            <div className={styles.leftSection}
                                onClick={handleLogout}
                                style={{ cursor: "pointer" }}>
                                <TbLogout className={styles.menuIcon} />
                                <span className={styles.orders}>Logout</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conditional Content */}
                <div className={styles.tabContent}>
                    {activeTab === "profile" && (
                        <div className={styles.profileSection}>
                            {/* Section 1: Personal Info (Name + Email) */}
                            <div className={styles.sectionContainer}>
                                <div className={styles.sectionHeader}>
                                    <span>Personal Information</span>
                                    <button
                                        className={styles.editButton}
                                        onClick={() => toggleEdit("personalInfo")}
                                    >
                                        {editFields.personalInfo ? "Save" : "Edit"}
                                    </button>
                                </div>

                                {/* Name Fields Side-by-Side */}
                                <div className={styles.nameRow}>
                                    {editFields.personalInfo ? (
                                        <>
                                            <input
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className={styles.input}
                                                placeholder="First Name"
                                            />
                                            <input
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className={styles.input}
                                                placeholder="Last Name"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <span className={styles.nameField}>{formData.firstName}</span>
                                            <span className={styles.nameField}>{formData.lastName}</span>
                                        </>
                                    )}
                                </div>

                                {/* Email */}
                                <div className={styles.inputGroup}>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                        className={styles.emailInput}
                                    />
                                </div>
                            </div>
                            {/* Section 2: Phone Number */}
                            <div className={styles.sectionContainer1}>
                                <div className={styles.sectionHeader1}>
                                    <span>Phone Number</span>
                                    <button
                                        className={styles.editButton}
                                        onClick={() => {
                                            if (editFields.phone) {
                                                // Save mode: handle saving if needed
                                                console.log("Saving phone:", formData.phone);
                                            }
                                            toggleEdit("phone"); // toggles edit/view mode
                                        }}
                                    >
                                        {editFields.phone ? "Save" : "Edit"}
                                    </button>
                                </div>

                                <div className={styles.inputGroup1}>
                                    {editFields.phone ? (
                                        <PhoneInput
                                            country={'in'}
                                            value={newAddress.phoneNumber}
                                            onChange={(value) => handleInputChange('phoneNumber', value)}
                                            inputStyle={{ width: '100%', marginTop: "10px" }}
                                            enableSearch
                                        />

                                    ) : (
                                        <p className={styles.phoneInput}>
                                            {formData.phone ? `+${formData.phone}` : "Not provided"}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}


                    {activeTab === "addresses" && (
                        <>
                            {showAddressForm ? (
                                <form className={styles.addressForm} onSubmit={handleSubmitNewAddress}>
                                    <div className={styles.inlineFields}>
                                        <label>
                                            First Name
                                            <input type="text" name="firstName" placeholder="Firstname" value={newAddress.firstName} onChange={handleInputChange} />
                                        </label>
                                        <label>
                                            Last Name
                                            <input type="text" name="lastName" placeholder="Lastname" value={newAddress.lastName} onChange={handleInputChange} />
                                        </label>
                                    </div>

                                    <div className={styles.inlineFields}>
                                        <label>
                                            Email
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={user.email}
                                                readOnly
                                            />
                                        </label>
                                        <label>
                                            Phone Number
                                            <PhoneInput
                                                country="in"
                                                value={newAddress.phoneNumber}
                                                onChange={(value) => handleInputChange('phoneNumber', value)}
                                                containerStyle={{
                                                    marginTop: "6px",   // 👈 this will actually add top margin
                                                    width: "100%"
                                                }}
                                                inputStyle={{
                                                    borderRadius: "0px",
                                                    width: "100%",
                                                    height: "100%",
                                                    fontSize: "15px",
                                                    textTransform: "capitalize",
                                                    paddingLeft: "45px",

                                                }} enableSearch
                                            />
                                        </label>
                                    </div>

                                    <label>
                                        Address 1
                                        <textarea name="addressLine1" placeholder="Address 1" value={newAddress.addressLine1} onChange={handleInputChange} />
                                    </label>

                                    <label>
                                        Address 2
                                        <textarea name="addressLine2" placeholder="Address 2" value={newAddress.addressLine2} onChange={handleInputChange} />
                                    </label>

                                    <div className={styles.inlineFields}>
                                        <label>
                                            City / Town
                                            <input type="text" name="city" placeholder="City/town" value={newAddress.city} onChange={handleInputChange} />
                                        </label>
                                        <label>
                                            State
                                            <select name="state" value={newAddress.state} className={styles.inlineFields} onChange={handleInputChange}>
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

                                    <div className={styles.inlineFields}>
                                        <label>
                                            Flat No/Locality
                                            <input type="text" name="locality" placeholder="Flat No/Locality" value={newAddress.locality} onChange={handleInputChange} />
                                        </label>
                                        <label>
                                            Pin
                                            <input type="number" name="pin" placeholder="Pin" value={newAddress.pin} onChange={handleInputChange} />
                                        </label>
                                    </div>

                                    <div className={styles.inlineFields}>
                                        <label>
                                            Landmark
                                            <input type="text" name="landmark" placeholder="landmark (optional)" value={newAddress.landmark} onChange={handleInputChange} />
                                        </label>
                                    </div>

                                    <div className={styles.buttonGroup}>
                                        <button type="submit" className={styles.addButton}>
                                            Add Address
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.cancelButton}
                                            onClick={handleCancelNewAddress}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                // Default Address Tab UI
                                <div className={styles.addressSection}>
                                    <h2>Manage Addresses</h2>
                                    <button className={styles.addButton} onClick={handleAddAddress}>
                                        + Add New Address
                                    </button>

                                    <ul className={styles.addressList}>
                                        {addressData.addresses.map((item, index) => (
                                            <li key={index} className={styles.addressItem}>
                                                <div className={styles.addressDetails}>
                                                    <div className={styles.namePhone}>
                                                        <span className={styles.name}>
                                                            {item.firstName} {item.lastName}
                                                        </span>
                                                        <span className={styles.phone}>+{item.phoneNumber}</span>
                                                    </div>
                                                    <div className={styles.addressLines}>
                                                        <div>
                                                            {item.addressLine1}, {item.addressLine2}, {item.city}, {item.state} {item.pin}
                                                        </div>
                                                        {item.landmark?.trim() && (
                                                            <div className={styles.landmark}>
                                                                Landmark: {item.landmark}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <button
                                                    className={styles.deleteButton}
                                                    onClick={() => handleDeleteAddress(item._key)} // use _key, not index
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}


                    {/* Filters only in sidebar, shown if My Orders active and toggled */}
                    {activeTab === "products" && showOrderFilters && (
                        <>
                            {/* <OrderProductList /> */}
                            <OrderProductList
                                // products={userOrders} // array of order products (each with orderStatus, orderDate, etc.)
                                user={user}   // optional if user-specific logic needed
                                filters={{
                                    status: selectedStatuses, // array of strings e.g., ["Delivered"]
                                    date: selectedDateFilters // array of strings e.g., ["Last 30 Days", "2023"]
                                }}
                            />
                        </>
                    )}


                </div>
            </div>
        </div>
    );
};

export default Dashboard;
