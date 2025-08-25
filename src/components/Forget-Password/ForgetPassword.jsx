import React, { useState } from "react";
import styles from "./ForgetPassword.module.css"; // optional styling
import { sanityClient } from "../../utils/sanityClient";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const user = await sanityClient.fetch(
        `*[_type == "customer" && email == $email][0]`,
        { email }
      );

      if (!user) {
        setError("User with this email does not exist.");
        return;
      }

      // Update password in Sanity
      await sanityClient
        .patch(user._id)
        .set({ password: newPassword })
        .commit();

      setSuccess("Password updated successfully. You can now log in.");
      setEmail("");
      setNewPassword("");
    } catch (err) {
      console.error("Error resetting password:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Reset Your Password</h2>

      <form onSubmit={handleResetPassword} className={styles.form}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </div>
  );
};

export default ForgetPassword;
