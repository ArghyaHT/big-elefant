import React, { useEffect, useState } from "react";
import styles from "./Faq.module.css"
import { FaChevronDown, FaMinus, FaPlus } from "react-icons/fa";
import { sanityClient } from "../../utils/sanityClient";

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
          const [faqData, setFaqData] = useState([]);
  const [categories, setCategories] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedTab, setSelectedTab] = useState(categories[0]);
    const isMobile = useIsMobile();


  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "faq"]`);
        setFaqData(data);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map(item => item.category))
        );
        setCategories(uniqueCategories);
        setSelectedTab(uniqueCategories[0]); // default to first category
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFAQs();
  }, []);


    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredData = faqData.filter(item => item.category === selectedTab);

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
                categories.map(tab => {
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
                        {/* <h2 className={styles.sidebarHeading}>Table of Contents</h2> */}

                        {categories.map(tab => (
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