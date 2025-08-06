import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import BrandMessage from "../components/BrandMessage/BrandMessage";
import HomeProductDetail from "../components/HomeProductDetail/HomeProductDetail";
import Plastic from "../components/Plastic/Plastic";
import WildMerchSection from "../components/Wild Merch/WildMerch";
import BigElefantClub from "../components/JoinElefantClub/JoinElefantClub";
import Footer from "../components/Footer/Footer";

const Home = () => {

  return (
    <div>
        <Navbar />
        <Hero />
        <BrandMessage />
        <HomeProductDetail />
        <Plastic />
        <WildMerchSection />
        <BigElefantClub />
        <Footer />
    </div>
  );
};

export default Home;