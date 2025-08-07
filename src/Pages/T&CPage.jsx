import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import TermsAndConditions from "../components/T&C/T&C";

const TermsContionsPage = () => {

  return (
    <div>
        <Navbar />
        <TermsAndConditions />
        <Footer />
    </div>
  );
};

export default TermsContionsPage;