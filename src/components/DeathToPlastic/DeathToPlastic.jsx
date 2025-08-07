import styles from './DeathToPlastic.module.css';
import plastic1 from "../../assets/plastic3.png"
import plastic2 from "../../assets/plastic2.png"
import plastic3 from "../../assets/plastic1.png"
import logo from "../../assets/logo.png"
import { useState } from 'react';
import { useEffect } from 'react';
import { sanityClient } from '../../utils/sanityClient';


const DeathToPlastic= () => {
    const [mediaData, setMediaData] = useState([]);

      useEffect(() => {
    sanityClient
      .fetch(`*[_type == "deathToPlastic"]{
        title,
        "image": image.asset->url
      }`)
      .then((data) => setMediaData(data))
      .catch(console.error);
  }, []);

  return (
    <>
    <div className={styles.heroSection}>
      <div className={styles.overlay}>
        <div className={styles.badgeText}>
          <p>Elefant</p>
          <p>crushes</p>
          <p>Plastic</p>
        </div>
      </div>
    </div>

          {/* MEDIA SECTION */}
   <div className={styles.mediaSection}>
  {mediaData.map((item, index) => (
    <div key={index}>
      <div className={styles.mediaCard}>
        <h2 className={styles.mediaHeading}>{item.title}</h2>
        {item.image && <img src={item.image} alt={item.title} className={styles.mediaImage} />}
      </div>

      {/* Extra section after first item */}
      {index === 0 && (
        <section className={styles.extraSection}>
          <p>Plastic isn’t really recyclable anymore—it’s just not profitable. Most recycling centers now send plastic straight to landfills because recycling it would put them out of business. Some environmental economists even suggest it's better to toss plastic in the trash to reduce the emissions from extra trucking. Sad, but true. Meanwhile, over 75% of all aluminum made since 2025 is still in use today. #CrushToPlastic</p>
        </section>
      )}
    </div>
  ))}
</div>

{/* LOGO SECTION */}
<div className={styles.logoSection}>
  <img src= {logo} className={styles.logoImage} />
  <p className={styles.logoText}>5 Gyres is a non-profit organization that uses science, education and adventure to empower action against the global crisis of plastic pollution.</p>
</div>


    </>
  );
};

export default DeathToPlastic;