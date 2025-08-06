import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import MerchSection from "../components/Merch/MerchSection";

const MerchPage = () => {

  return (
    <div>
        <Navbar />
        <MerchSection />
        <Footer />
    </div>
  );
};

export default MerchPage;