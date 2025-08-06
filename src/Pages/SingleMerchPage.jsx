import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import SingleProduct from "../components/SingleProduct/SingleProduct";
import SingleMerch from "../components/SingleMerch/SingleMerch";

const SingleMerchPage = () => {

  return (
    <div>
        <Navbar />
        <SingleMerch />
        <Footer />
    </div>
  );
};

export default SingleMerchPage;