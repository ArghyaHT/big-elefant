import React, { useState } from "react";
import styles from "./ChangePassword.module.css";
import { sanityClient } from "../../utils/sanityClient";
import { useLocation, useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const ChangePassword = ({ }) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const navigate = useNavigate()



    // ✅ get email from query param
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");


    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // ✅ Validate passwords match
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            // Fetch the user by email from Sanity
            const user = await sanityClient.fetch(
                `*[_type == "customer" && email == $email][0]`,
                { email }
            );

            if (!user) {
                setError("User does not exist.");
                return;
            }

            // Update the password in Sanity
            await sanityClient
                .patch(user._id)
                .set({ password: newPassword })
                .commit();

            setSuccess("Password updated successfully!");
            setNewPassword("");
            setConfirmPassword("");
            setShowSuccessModal(true);
        } catch (err) {
            console.error("Error updating password:", err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <h2>Change Password</h2>

            <form onSubmit={handleChangePassword} className={styles.form}>
                {/* New Password */}
                <label>New Password</label>
                <div className={styles.passwordWrapper}>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <span
                        className={styles.eyeIcon}
                        onClick={() => setShowNewPassword((prev) => !prev)}
                    >
                        {showNewPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </span>
                </div>

                {/* Confirm Password */}
                <label>Confirm Password</label>
                <div className={styles.passwordWrapper}>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <span
                        className={styles.eyeIcon}
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                        {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </span>
                </div>


                <button type="submit">Change Password</button>
            </form>

            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}

            {/* ✅ Success Modal */}
      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>🎉 Password Changed</h2>
            <p>Your password has been updated successfully!</p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/sign-in"); // 👈 redirect to login after password change
              }}
            >
              Ok
            </button>
          </div>
        </div>
      )}
        </div>
    );

};


export default ChangePassword;
