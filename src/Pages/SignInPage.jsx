import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import SignIn from "../components/SignIn/SignIn";

const SignInPage = () => {

  return (
    <div>
        <Navbar />
        <SignIn />
        <Footer />
    </div>
  );
};

export default SignInPage;