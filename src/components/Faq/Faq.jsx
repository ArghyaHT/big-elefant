import React, { useEffect, useState } from "react";
import styles from "./Faq.module.css"
import { FaChevronDown, FaMinus, FaPlus } from "react-icons/fa";


const data = [
    // About the Brand
    {
        question: 'What is Big Elephant?',
        answer: 'Big Elephant is a premium beverage brand offering refreshing drinks made with high-quality, natural ingredients and bold design.',
        category: 'About the Brand',
    },
    {
        question: 'Why is it called Big Elephant?',
        answer: 'The name represents strength, uniqueness, and making an impact — just like our mission to redefine refreshment and conscious consumption.',
        category: 'About the Brand',
    },
    {
        question: 'Is Big Elephant an energy drink or alcoholic?',
        answer: 'No. Big Elephant beverages are non-alcoholic and caffeine-free (unless stated otherwise), made purely for hydration and enjoyment.',
        category: 'About the Brand',
    },

    // Ingredients & Flavors
    {
        question: 'What ingredients are used in your drinks?',
        answer: 'We use pure water, natural fruit extracts, and minimal or no sweeteners to ensure clean, crisp taste with no artificial additives.',
        category: 'Ingredients & Flavors',
    },
    {
        question: 'Are your drinks vegan and gluten-free?',
        answer: 'Yes! All our beverages are 100% vegan, gluten-free, and suitable for most dietary lifestyles.',
        category: 'Ingredients & Flavors',
    },
    {
        question: 'Do your drinks contain sugar or calories?',
        answer: 'Most of our drinks have zero sugar and are calorie-free. Some flavors may contain natural sweeteners or minimal calories, always clearly labeled.',
        category: 'Ingredients & Flavors',
    },

    // Sustainability
    {
        question: 'What makes your packaging sustainable?',
        answer: 'We use recyclable materials like aluminum and paper-based packaging to reduce plastic waste and environmental impact.',
        category: 'Sustainability',
    },
    {
        question: 'Are your cans and boxes recyclable?',
        answer: 'Yes, both our cans and packaging are 100% recyclable. Please dispose of them responsibly.',
        category: 'Sustainability',
    },
    {
        question: 'Do you support any social or environmental causes?',
        answer: 'Yes, a portion of every sale supports organizations focused on sustainability, clean water, and community well-being.',
        category: 'Sustainability',
    },

    // Orders & Shipping
    {
        question: 'Where can I buy your drinks?',
        answer: 'You can purchase our products online from our website and selected retailers nationwide.',
        category: 'Orders & Shipping',
    },
    {
        question: 'Is there a subscription option available?',
        answer: 'Yes! You can subscribe for regular deliveries and enjoy exclusive discounts and early access to new products.',
        category: 'Orders & Shipping',
    },
    {
        question: 'How long does delivery usually take?',
        answer: 'Orders are processed within 1-3 business days. Delivery times vary based on location, and tracking is provided after dispatch.',
        category: 'Orders & Shipping',
    },
];


const tabs = [
    'About the Brand',
    'Ingredients & Flavors',
    'Sustainability',
    'Orders & Shipping'
];

// Add this hook in the same file or import from utils
const useIsMobile = (breakpoint = 480) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return isMobile;
};

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const isMobile = useIsMobile();

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredData = data.filter(item => item.category === selectedTab);

    return (
        <section className={styles.faq}>
            <div className={styles.faqheaderSection}>
                <h2 className={styles.faqHeading}>Questions? look here.</h2>
                <p className={styles.faqDesc}>
                    Can’t find an answer? call us at (+91) 12345 67890 or email demo@gmail.com!
                </p>
            </div>

            {isMobile ? (
                // 👉 Mobile View: Show all categories
                tabs.map(tab => {
                    const categoryData = data.filter(item => item.category === tab);
                    return (
                        <div key={tab} className={styles.mobileTabSection}>
                            <h3 className={styles.mobileTabHeading}>{tab}</h3>
                            {categoryData.map((item, index) => (
                                <div key={index} className={styles.accordionItem}>
                                    <div
                                        className={styles.accordionTitle}
                                        onClick={() => toggleAccordion(`${tab}-${index}`)}
                                    >
                                        <span>{item.question}</span>
                                        {openIndex === index ? (
                                            <FaMinus className={styles.icon} />
                                        ) : (
                                            <FaPlus className={styles.icon} />
                                        )}
                                    </div>
                                    {openIndex === `${tab}-${index}` && (
                                        <div className={styles.accordionContent}>{item.answer}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    );
                })
            ) : (
                // 👉 Desktop View: Sidebar + Questions
                <div className={styles.faqLayout}>
                    <aside className={styles.sidebar}>
                        <h2 className={styles.sidebarHeading}>Table of Contents</h2>

                        {tabs.map(tab => (
                            <button
                                key={tab}
                                className={`${styles.sidebarButton} ${selectedTab === tab ? styles.activeTab : ''}`}
                                onClick={() => {
                                    setSelectedTab(tab);
                                    setOpenIndex(null);
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </aside>

                    <div className={styles.contentArea}>
                        {filteredData.map((item, index) => (
                            <div key={index} className={styles.accordionItem}>
                                <div
                                    className={styles.accordionTitle}
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span>{item.question}</span>
                                    {openIndex === index ? (
                                        <FaMinus className={styles.icon} />
                                    ) : (
                                        <FaPlus className={styles.icon} />
                                    )}
                                </div>
                                {openIndex === index && (
                                    <div className={styles.accordionContent}>{item.answer}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Faq;