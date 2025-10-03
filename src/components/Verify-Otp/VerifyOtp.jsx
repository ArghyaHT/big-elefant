import React, { useState } from "react";
import styles from "./VerifyOtp.module.css"; // optional styling
import { sanityClient } from "../../utils/sanityClient";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // initialize navigate


    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const hardcodedEmail = "bikkihimanstech@gmail.com";


        try {
            // 1️⃣ Fetch the user by email from Sanity
            const user = await sanityClient.fetch(
                `*[_type == "customer" && email == $email][0]`,
                { email: hardcodedEmail }
            );



            if (!user) {
                setError("User with this email does not exist.");
                return;
            }

            console.log("Fetched user:", user);

            const enteredOtpNumber = Number(otp); // otp is from the input field

            // 2️⃣ Compare entered OTP with saved OTP
            if (user.otp === enteredOtpNumber) {
                setSuccess("OTP verified successfully!");
                setOtp("");
                // Optionally, you can clear OTP in Sanity after verification
                // await sanityClient.patch(user._id).unset(['otp']).commit();
                navigate(`/change-password?email=${encodeURIComponent(hardcodedEmail)}`);

            } else {
                setError("Invalid OTP. Please try again.");
            }
        } catch (err) {
            console.error("Error verifying OTP:", err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <h2>Verify OTP</h2>

            <form onSubmit={handleVerifyOtp} className={styles.form}>
                <label>OTP</label>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />

                <button type="submit">Verify OTP</button>
            </form>

            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
        </div>
    );
};

export default VerifyOtp;
