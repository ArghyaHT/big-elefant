import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css"; // Make sure you create this CSS file
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { sanityClient } from "../../utils/sanityClient";

const SignIn = ({ onLoginSuccess, redirectTo = "/user-dashboard", isModal = false, onSwitchToSignUp }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const user = await sanityClient.fetch(
                `*[_type == "customer" && email == $email][0]`,
                { email }
            );

            if (!user) {
                setError("User not found.");
                return;
            }

            if (user.password !== password) {
                setError("Incorrect password.");
                return;
            }

            // ✅ Save user
            localStorage.setItem("user", JSON.stringify(user));

            // ✅ Call parent callback if provided
            if (onLoginSuccess) {
                onLoginSuccess(user);
            } else {
                navigate(redirectTo, { state: { user } });
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={isModal ? styles.containerModal : styles.container}>
                <h2 className={isModal ? styles.modalTitle : styles.title}>
                    Sign Into your account
                </h2>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <div className={styles.passwordWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className={styles.eyeIcon}
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </span>
                        </div>
                    </div>

                    <div className={styles.forgotPassword}>
                        <Link to="/forget-password">Forgot Password?</Link>
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.loginButton}>Sign In</button>
                        {isModal ? (
                            <button
                                type="button"
                                className={styles.signupButton}
                                onClick={onSwitchToSignUp} // 👈 call parent toggle
                            >
                                Create Account
                            </button>
                        ) : (
                            <Link to="/sign-up" className={styles.signupButton}>Create Account</Link>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;