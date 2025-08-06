import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import SingleProduct from "../components/SingleProduct/SingleProduct";

const SingleProductPage = () => {

  return (
    <div>
        <Navbar />
        <SingleProduct />
        <Footer />
    </div>
  );
};

export default SingleProductPage;