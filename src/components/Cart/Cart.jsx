import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/cartSlice"; // Update with your actual path
import styles from "./Cart.module.css";
import { IoClose } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";

import sparklingWater from "../../assets/sparkling-water.png"
import drinnkingWater from "../../assets/drinking-water.png"

import banner1 from "../../assets/banner1.png"
import banner2 from "../../assets/banner2.png"
import { useNavigate } from "react-router-dom";
import { decreaseMerchQuantity, increaseMerchQuantity, removeMerchFromCart } from "../../redux/merchCartSlice";
import { toggleCart } from "../../redux/uiSlice";


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

const Cart = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();


  // Get cart open state and items from Redux store
const isOpen = useSelector((state) => state.ui.isCartOpen); // <- updated
  const beverageCartItems = useSelector((state) => state.cart.items);
  const merchCartItems = useSelector((state) => state.merchCart.items);
  const cartItems = [...beverageCartItems, ...merchCartItems];

  console.log("Cart Items in Cart component:", cartItems);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);


  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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


  return (
    <>
      <div
        className={`${styles.cartPanel} ${isOpen ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.cartHeader}>
          <h2>Your Cart</h2>
          <button className={styles.closeBtn} onClick={() => dispatch(toggleCart())}>
            <IoClose />
          </button>
        </div>

        {/* <div className={styles.shippingContainer}>
          <p className={styles.shippingNote}>-- Free shipping on orders above 1200 --</p>
        </div> */}

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p className={styles.emptyTitle}>Your cart is empty.</p>
            <p className={styles.emptySubtitle}>Add your favorite items to you cart.</p>
            <button
              className={styles.shopNowBtn}
              onClick={() => {
                dispatch(toggleCart());
                navigate("/beverages");
              }}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <>
            <div className={styles.scrollableContainer}>

              <ul className={styles.cartList}>
                {cartItems.map((item) => (
                  <li key={`${item.type}-${item.id}`} className={styles.cartItem}>
                    <div className={styles.itemImageWrapper}>
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className={styles.itemImage}
                      />
                    </div>

                    <div className={styles.itemDetails}>
                      <div className={styles.itemName}>
                        {item.name}
                      </div>

                      <div className={styles.itemPrice}>
                        {item.packSize > 1 ? ` Pack of ${item.packSize}` : ""}
                      </div>

                      <div className={styles.itemPrice}>
                        {item.currency}{(item.price * item.quantity).toFixed(2)}
                      </div>

                      <div className={styles.itemControls}>
                        <div className={styles.quantityControls}>
                          <button
                            onClick={() =>
                              item.type === "beverage"
                                ? dispatch(decreaseQuantity(item.id))
                                : dispatch(decreaseMerchQuantity(item.id))
                            } className={styles.quantityBtn}
                            disabled={item.quantity === 1}  // disable when quantity is 1

                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              item.type === "beverage"
                                ? dispatch(increaseQuantity(item.id))
                                : dispatch(increaseMerchQuantity(item.id))
                            }
                            className={styles.quantityBtn}
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            item.type === "beverage"
                              ? dispatch(removeFromCart(item.id))
                              : dispatch(removeMerchFromCart(item.id))
                          }
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
                      <p className={styles.productName}>{prod.productName}</p>
                      <p className={styles.productPrice}>{prod.currency}{prod.price.toFixed(2)}</p>
                      <button
                        className={styles.buyNowButton}
                        onClick={() =>
                          dispatch(
                            addToCart({
                              ...prod,
                              id: `${prod.id}-1`,    // default packSize = 1
                              packSize: 1,
                              quantity: 1,
                              price: Number(prod.price) * 1, // price for single pack
                            })
                          )
                        }
                      >
                        Buy Now
                      </button>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </>
        )}



        {cartItems.length > 0 && (
          <>
            <div className={styles.cartTotal}>
              <strong>Total:</strong> ₹{totalPrice.toFixed(2)}
            </div>

            <div className={styles.checkoutButtonWrapper}>
              <button
                className={styles.secondaryBtn}
                onClick={() => {
                  dispatch(toggleCart());
                  navigate("/beverages");
                }}
              >
                Keep Shopping
              </button>
              <button
                className={styles.checkoutBtn}
                onClick={() => {
                  dispatch(toggleCart());
                  navigate("/check-out", { state: { cartItems } });
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}

      </div>

      {isOpen && <div className={styles.overlay} onClick={() => dispatch(toggleCart())}></div>}
    </>
  );
};

export default Cart;
