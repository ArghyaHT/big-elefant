import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css"; // Create this CSS file
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'; // This includes default styles
import { sanityClient } from "../../utils/sanityClient";
const SignUp = ({ isModal = false, onSignUpSuccess, onSwitchToSignIn }) => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (value, country, e, formattedValue) => {
    // Check if user tries to delete everything
    if (value.length <= country.dialCode.length) {
      setPhone(country.dialCode); // Reset to just the country code
    } else {
      setPhone(value);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Check if email exists in Sanity
      const existingUsers = await sanityClient.fetch(
        `*[_type == "customer" && email == $email]`,
        { email: formData.email }
      );

      if (existingUsers.length > 0) {
        setError("Email already exists. Please use another email.");
        setLoading(false);
        return;
      }

      // 2. If email unique, create new user
      const newUser = {
        _type: 'customer',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password, // Consider hashing passwords before storing!
        phoneNumber: phone,
      };

      const createdUser = await sanityClient.create(newUser);

      // Store user in localStorage (you can customize what to store)
      localStorage.setItem("user", JSON.stringify(createdUser));


    if (isModal && onSignUpSuccess) {
      // ✅ If opened in modal (checkout flow)
      onSignUpSuccess(createdUser);
    } else {
      // ✅ Normal signup page flow
      navigate("/");
      alert("User registered successfully!");
    }

      setFormData({ firstName: "", lastName: "", email: "", password: "" });
      setPhone("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={isModal? styles.containerModal: styles.container}>
        <h2 className={styles.title}>Create your account</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.nameRow}>
            <div className={styles.inputGroup}>
              <label>First Name</label>
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Last Name</label>
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Phone Number</label>
            <PhoneInput
              country={'in'}
              value={phone}
              onChange={handlePhoneChange}
              inputStyle={{ width: "100%" }}
              enableSearch
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.createButton} disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
            {isModal ? (
              <button
                type="button"
                className={styles.signinButton}
                onClick={onSwitchToSignIn}
              >
                Already have an account? Sign In
              </button>
            ) : (
              <Link to="/sign-in" className={styles.signinButton}>
                Already have an account? Sign In
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
