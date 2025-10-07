import React, { useState } from "react";
import styles from "./ForgetPassword.module.css"; // optional styling
import { sanityClient } from "../../utils/sanityClient";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
    const navigate = useNavigate();

  

 const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Check if user exists in Sanity
      const user = await sanityClient.fetch(
        `*[_type == "customer" && email == $email][0]`,
        { email }
      );

      if (!user) {
        setError("User with this email does not exist.");
        return;
      }
      // Call backend API to send OTP
      const response = await fetch("https://iqb-final.onrender.com/api/big-elefant/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess("OTP sent to your email. Please check your inbox.");
        setEmail("");
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        setError(data.message || "Failed to send OTP. Try again.");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Reset Your Password</h2>

      <form onSubmit={handleSendOtp} className={styles.form}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send OTP</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </div>
  );
};

export default ForgetPassword;

