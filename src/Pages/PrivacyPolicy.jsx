import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import PrivacyPolicy from "../components/PrivacyPolicy/PrivacyPolicy";

const PrivacyPolicyPage = () => {

  return (
    <div>
        <Navbar />
        <PrivacyPolicy />
        <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;