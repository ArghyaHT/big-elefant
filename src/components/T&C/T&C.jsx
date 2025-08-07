import React from 'react';
import styles from './T&C.module.css';

const TermsAndConditions = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Terms & Conditions</h1>
      <p className={styles.paragraph}><strong>Last Updated:</strong> 15 Aug 2025</p>
      <p className={styles.paragraph}>
        Welcome to <strong>Big Elefant</strong>, where every can you crack open is a strike against plastic waste and a salute to mountain-sourced hydration.
        These Terms of Service (“Terms”) govern your access to and use of our website, mobile platforms, and purchase of our canned water products across India.
      </p>
      <p className={styles.paragraph}>
        By purchasing from or interacting with us, you accept these terms. If you don’t like terms, no pressure—but you won’t be able to taste our crisp, can-powered revolution.
      </p>

      <h2 className={styles.sectionTitle}>1. Who Can Buy</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>Be at least 18 years old, or have permission from a legal guardian.</li>
        <li className={styles.listItem}>Be in India (yes, we only deliver within India for now).</li>
        <li className={styles.listItem}>Not be part of any anti-elephant conspiracy (we're joking... sort of).</li>
      </ul>

      <h2 className={styles.sectionTitle}>2. Product Information</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>Big Elefant sells premium canned water in eco-conscious aluminum cans.</li>
        <li className={styles.listItem}>It’s just water, but bold. No sugar, no calories, no plastic lies.</li>
        <li className={styles.listItem}>Sourced from verified water sources and processed under hygienic, food-safe conditions.</li>
        <li className={styles.listItem}>Each can is infinitely recyclable—just like your faith in better packaging.</li>
      </ul>
      <p className={styles.paragraph}>For full ingredients (spoiler: it’s water), storage guidelines, and sourcing transparency, check each product page.</p>

      <h2 className={styles.sectionTitle}>3. Orders, Shipping & Delivery</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>Orders can be placed directly via our website or verified partners.</li>
        <li className={styles.listItem}>Once confirmed, orders are usually dispatched within 1–3 business days.</li>
        <li className={styles.listItem}>Delivery typically takes 2–7 business days depending on your pin code.</li>
        <li className={styles.listItem}>You’ll receive tracking info via SMS or email.</li>
        <li className={styles.listItem}>If your can arrives damaged or squished—email us with proof. We’ll fix it.</li>
      </ul>

      <h2 className={styles.sectionTitle}>4. Payments</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>We accept UPI, Credit/Debit Cards, Net Banking, Wallets, and COD (in select areas).</li>
        <li className={styles.listItem}>All transactions are in INR and include applicable GST.</li>
        <li className={styles.listItem}>Prices may change based on the market, supply chains, or just because elephants adjusted them.</li>
      </ul>

      <h2 className={styles.sectionTitle}>5. Cancellations, Returns & Refunds</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>Cancellations: Allowed only before shipment.</li>
        <li className={styles.listItem}>Returns: Accepted for damaged/defective/wrong items within 48 hours of delivery.</li>
        <li className={styles.listItem}>Refunds: Processed within 7–10 working days after verification.</li>
      </ul>
      <p className={styles.paragraph}>No returns on used, opened, or mood-based change-of-mind situations. We're hydration activists, not heartbreak healers.</p>

      <h2 className={styles.sectionTitle}>6. Safety Disclaimer</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>Store cans in a cool, dry place, away from direct sunlight.</li>
        <li className={styles.listItem}>Do not puncture, burn, or microwave the can.</li>
        <li className={styles.listItem}>If anything seems off, contact us before consuming.</li>
      </ul>

      <h2 className={styles.sectionTitle}>7. Intellectual Property</h2>
      <p className={styles.paragraph}>
        The name Big Elefant, our logo, product designs, slogans, and all content on our platforms are legally protected.
        Unauthorized use may lead to legal action.
      </p>

      <h2 className={styles.sectionTitle}>8. Limitation of Liability</h2>
      <p className={styles.paragraph}>
        We’re not liable for indirect damages, health issues from misuse, or delays caused by third-party couriers.
        Always use the product as intended: for drinking.
      </p>

      <h2 className={styles.sectionTitle}>9. Governing Law & Jurisdiction</h2>
      <p className={styles.paragraph}>
        These Terms are governed by Indian law. Disputes will be resolved in the courts of <em>[Insert City]</em>.
      </p>

      <h2 className={styles.sectionTitle}>10. Updates to Terms</h2>
      <p className={styles.paragraph}>
        We may update these Terms from time to time. Continued use means you agree to the latest version.
      </p>

      <h2 className={styles.sectionTitle}>11. Contact Us</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>📧 Email: <em>[Insert support email]</em></li>
        <li className={styles.listItem}>📞 Phone: <em>[Insert customer support number]</em></li>
        <li className={styles.listItem}>🌐 Website: <em>[Insert website URL]</em></li>
      </ul>

      <p className={styles.paragraph}><strong>Big Elefant</strong><br />
        Not just water. A movement in a can.
      </p>
    </div>
  );
};

export default TermsAndConditions;
