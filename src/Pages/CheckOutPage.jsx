import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import BeveragesSection from "../components/Beverages/BeveragesSection";
import CheckOut from "../components/CheckOut/CheckOut";

const CheckOutPage = () => {

  return (
    <div>
        <Navbar />
        <CheckOut />
        <Footer />
    </div>
  );
};

export default CheckOutPage;