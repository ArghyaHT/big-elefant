import React from "react";
import { Link } from "react-router-dom";
import notFoundImage from "../assets/404.png"

const NotFoundPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#f7f7f7",
      }}
    >
  {/* 👇 Image Section */}
      <img
        src={notFoundImage}
        alt="Page not found"
        style={{
          width: "60%",
          maxWidth: "500px",
        }}
      />
      <h2 style={{ marginTop: "0px", marginBottom: "1rem", fontSize: "4rem" }}>Oops!</h2>
       <p style={{ fontSize: "1.2rem", margin: "0px" }}>
       Something went wrong.
      </p>
      <p style={{ marginBottom: "2rem" }}>
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        style={{
          padding: "10px 20px",
          backgroundColor: "#000",
          color: "#fff",
          textDecoration: "none",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
