import React from 'react';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.paragraph}><strong>Last Updated:</strong> 15 Aug 2025</p>
      <p className={styles.paragraph}>
        At <strong>Big Elefant</strong>, we believe in keeping things pure—not just our water, but your privacy too.
        This policy explains how we collect, use, and protect your personal information under Indian law.
      </p>

      <h2 className={styles.sectionTitle}>1. Applicability</h2>
      <p className={styles.paragraph}>This Privacy Policy applies to all users in India who interact with our brand through:</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>Our website: <em>[Insert website URL]</em></li>
        <li className={styles.listItem}>Online orders</li>
        <li className={styles.listItem}>Customer support</li>
        <li className={styles.listItem}>Promotional activities</li>
        <li className={styles.listItem}>Social media channels</li>
      </ul>
      <p className={styles.paragraph}>By accessing or using our services, you agree to the practices described here, in line with Indian law.</p>

      <h2 className={styles.sectionTitle}>2. What Information We Collect</h2>
      <h4 className={styles.subheading}>Personal Information</h4>
      <ul className={styles.list}>
        <li className={styles.listItem}>Name</li>
        <li className={styles.listItem}>Email address</li>
        <li className={styles.listItem}>Mobile number</li>
        <li className={styles.listItem}>Delivery address</li>
      </ul>
      <h4 className={styles.subheading}>Payment Information</h4>
      <p className={styles.paragraph}>
        UPI, Credit/Debit card info, or Wallet details<br />
        <em>(Note: We use secure third-party payment gateways and DO NOT store card data on our servers.)</em>
      </p>

      <h2 className={styles.sectionTitle}>3. Purpose of Collection</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>To process your orders and deliver your water cans</li>
        <li className={styles.listItem}>To send order updates via SMS, email, or WhatsApp</li>
        <li className={styles.listItem}>To provide customer support</li>
        <li className={styles.listItem}>To personalize offers and improve user experience</li>
        <li className={styles.listItem}>To comply with Indian tax, legal, or regulatory obligations</li>
        <li className={styles.listItem}>To detect and prevent fraud</li>
      </ul>
      <p className={styles.paragraph}>We collect only the minimum data required for these purposes.</p>

      <h2 className={styles.sectionTitle}>4. Consent & User Rights (Under DPDP Act, 2023)</h2>
      <p className={styles.paragraph}>We collect and use your data only with your consent. You have the right to:</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>Access your personal data</li>
        <li className={styles.listItem}>Correct or update any inaccurate data</li>
        <li className={styles.listItem}>Withdraw consent at any time</li>
        <li className={styles.listItem}>Request deletion of your data (unless legally required to retain it)</li>
        <li className={styles.listItem}>Lodge a complaint with the Data Protection Board of India if needed</li>
      </ul>
      <p className={styles.paragraph}>To exercise any of these rights, contact us at <em>[Insert support email]</em>.</p>

      <h2 className={styles.sectionTitle}>5. Sharing of Personal Data</h2>
      <p className={styles.paragraph}>We may share your data only with:</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>Delivery partners to ship your order</li>
        <li className={styles.listItem}>Payment gateways for transaction processing</li>
        <li className={styles.listItem}>Marketing tools (only if you opt-in)</li>
        <li className={styles.listItem}>Government agencies when required by law</li>
      </ul>
      <p className={styles.paragraph}>We never sell or rent your personal information.</p>

      <h2 className={styles.sectionTitle}>6. Data Retention</h2>
      <p className={styles.paragraph}>
        We keep your data only for as long as necessary to fulfill the purpose for which it was collected,
        or as required under Indian law (such as for tax or accounting purposes).
      </p>

      <h2 className={styles.sectionTitle}>7. Data Security</h2>
      <p className={styles.paragraph}>
        We use encryption, firewalls, and secure hosting to keep your data safe. However, no system is 100% foolproof.
        In the rare case of a data breach, we’ll inform affected users as per the law.
      </p>

      <h2 className={styles.sectionTitle}>8. Cookies & Tracking</h2>
      <p className={styles.paragraph}>We use cookies to:</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>Remember your login or cart</li>
        <li className={styles.listItem}>Improve our website performance</li>
        <li className={styles.listItem}>Show relevant promotions</li>
      </ul>
      <p className={styles.paragraph}>You can disable cookies in your browser settings.</p>

      <h2 className={styles.sectionTitle}>9. Children’s Data</h2>
      <p className={styles.paragraph}>
        Our products are not intended for users under 18 years of age. We do not knowingly collect personal data from minors.
        If you are a guardian and believe we have collected such data, please contact us for immediate removal.
      </p>

      <h2 className={styles.sectionTitle}>10. Changes to This Privacy Policy</h2>
      <p className={styles.paragraph}>
        We may update this policy to reflect legal or operational changes.
        The updated version will be posted on our website with the revised date.
      </p>

      <h2 className={styles.sectionTitle}>11. Contact Us</h2>
      <p className={styles.paragraph}>For any questions, concerns, or data requests, contact:</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>📧 Email: <em>[Insert support email]</em></li>
        <li className={styles.listItem}>📞 Phone: <em>[Insert phone number]</em></li>
        <li className={styles.listItem}>🏢 Address: <em>[Insert company address]</em></li>
        <li className={styles.listItem}>🌐 Website: <em>[Insert URL]</em></li>
      </ul>

      <p className={styles.paragraph}><strong>Big Elefant</strong><br />
        Water with a conscience. Privacy with integrity.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
