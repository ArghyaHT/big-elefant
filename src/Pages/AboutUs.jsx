import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Aboutus from "../components/Aboutus/Aboutus";

const AboutUs = () => {

  return (
    <div>
        <Navbar />
        <Aboutus />
        <Footer />
    </div>
  );
};

export default AboutUs;