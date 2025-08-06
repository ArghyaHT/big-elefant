import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import SignUp from "../components/SignUp/SignUp";

const SignUpPage = () => {

  return (
    <div>
        <Navbar />
        <SignUp />
        <Footer />
    </div>
  );
};

export default SignUpPage;