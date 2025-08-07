import React, { useState } from "react";
import styles from "../Navbar/Navbar.module.css"
import logoImage from "../../assets/Big_Elefant.png"
import { FiHeart, FiMenu, FiShoppingBag, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../redux/cartSlice";
import { useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // <-- cart state
  const [loggedInUser, setLoggedInUser] = useState(null);

  const dispatch = useDispatch();

  // Use useSelector here inside the component function
  const totalQuantity = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setLoggedInUser(user);
    }
  }, []);


  return (
    <>
      <nav className={styles.navbar}>

        {/* Hamburger for mobile */}
        <div
          className={styles.hamburger}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <FiMenu />
        </div>

        {/* Left: Logo Image */}
        <div className={styles.logo}>
          <Link to="/">
            <img
              src={logoImage} // Replace with your actual logo path
              alt="Logo"
              className={styles.logoImage}
            />
          </Link>
        </div>

        {/* Shopping bag icon on right */}
        <div className={styles.cartIcon}>
          <div className={styles.cartIconWrapper}>
            <FiHeart className={styles.icon} />

            <FiShoppingBag
              className={styles.icon}
              onClick={() => dispatch(toggleCart())}
              style={{ cursor: "pointer" }}
            />
            {totalQuantity > 0 && (
              <span className={styles.cartBadge}>{totalQuantity}</span>
            )}
          </div>
        </div>

        {/* Desktop Nav Links */}
        <ul className={styles.navLinks}>
          <li>
            <Link to="/beverages" className={styles.navItem}>Beverages</Link>
          </li>
          {/* <li className={styles.navItem}>Merch</li> */}
          <li>
            <Link to="/merch" className={styles.navItem}>Merch</Link>
          </li>
          <li className={styles.navItem}>
             <Link to="/elefant-club" className={styles.navItem}>Elefant's club</Link>
            </li>
          <li>
            <Link to="/about-us" className={styles.navItem}>About</Link>
          </li>
        </ul>

        {/* Right: Icons */}
        <div className={styles.icons}>
          <div className={styles.icons}>
            {loggedInUser ? (
              <Link
                to="/user-dashboard"
                state={{ user: loggedInUser }}
                className={styles.customerName}
              >
                {loggedInUser.firstName}
              </Link>) : (
              <Link to="/sign-in">
                <FiUser className={styles.icon} />
              </Link>
            )}
          </div>
          <FiHeart className={styles.icon} />
          {/* <FiShoppingBag className={styles.icon} /> */}
          <div className={styles.cartIconWrapper}>
            <FiShoppingBag
              className={styles.icon}
              onClick={() => dispatch(toggleCart())}
              style={{ cursor: "pointer" }}
            />
            {totalQuantity > 0 && (
              <span className={styles.cartBadge}>{totalQuantity}</span>
            )}
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className={styles.mobileMenu}>
            <ul className={styles.mobileNavSection}>
              <li className={styles.sectionHeading}>Beverages</li>
              <li>
                <Link to="/beverages" className={styles.navItem} onClick={() => setMenuOpen(false)}>
                  Shop All
                </Link>
              </li>

              <li>
                <Link to="/beverages" className={styles.navItem} onClick={() => setMenuOpen(false)}>
                  Mountain Water
                </Link>
              </li>
              <li>
                <Link to="/beverages" className={styles.navItem} onClick={() => setMenuOpen(false)}>
                  Sparkling Water
                </Link>
              </li>
              {/* <li>
                <Link to="/merch" className={styles.navItem} onClick={() => setMenuOpen(false)}>
                  Merch
                </Link>
              </li> */}
            </ul>

            <ul className={styles.mobileNavSection}>
              <li className={styles.sectionHeading}>Merch</li>
              <li>
                <Link to="/merch" className={styles.navItem} onClick={() => setMenuOpen(false)}>
                  Shop All
                </Link>
              </li>
            </ul>

            <ul className={styles.mobileNavSection}>
              <li className={styles.sectionHeading}>Account</li>
              <li>
                <Link to="/" className={styles.navItem} onClick={() => setMenuOpen(false)}>
                  My Account
                </Link>
              </li>
            </ul>

            <ul className={styles.mobileNavSection}>
              <li className={styles.sectionHeading}>Information</li>
              <li>
                <Link to="/about-us" className={styles.navItem} onClick={() => setMenuOpen(false)}>
                  About
                </Link>
              </li>

              <li>
                <Link to="/elefant-club" className={styles.navItem} onClick={() => setMenuOpen(false)}>
                  ELEFANT’S CLUB- Coming soon
                </Link>
              </li>

              <li>
                <Link to="/" className={styles.navItem} onClick={() => setMenuOpen(false)}>
                  Water Quality Report
                </Link>
              </li>

              <li>
                <Link to="/faq" className={styles.navItem} onClick={() => setMenuOpen(false)}>
                  FAQ
                </Link>
              </li>

              <li>
                <Link to="/contact-us" className={styles.navItem} onClick={() => setMenuOpen(false)}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className={styles.navItem} onClick={() => setMenuOpen(false)}>
                  privacy policy
                </Link>
              </li>
              <li>
                <Link to="/" className={styles.navItem} onClick={() => setMenuOpen(false)}>
                  Terms & Conditions
                </Link>
              </li>
              {/*               
              <li className={styles.navItem} onClick={() => setMenuOpen(false)}>
                Country Club
              </li> */}
            </ul>

            <Link
              to={loggedInUser ? "/user-dashboard" : "/sign-in"}
              state={loggedInUser ? { user: loggedInUser } : null}
            >
              <button className={styles.userButton}>
                {loggedInUser ? loggedInUser.firstName  : "Login"}
              </button>
            </Link>
          </div>


        )}
      </nav>
      <Cart />
    </>
  )
}

export default Navbar