import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import BeveragesSection from "../components/Beverages/BeveragesSection";

const Beverages = () => {

  return (
    <div>
        <Navbar />
        <BeveragesSection />
        <Footer />
    </div>
  );
};

export default Beverages;