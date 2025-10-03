import ChangePassword from "../components/Changepassword/ChangePassword";
import Contactus from "../components/ContactUs/ContactUs";
import Footer from "../components/Footer/Footer";

import Navbar from "../components/Navbar/Navbar";
import VerifyOtp from "../components/Verify-Otp/VerifyOtp";

const ChangePasswordPage = () => {

  return (
    <div>
        <Navbar />
        <ChangePassword/>
        <Footer />
    </div>
  );
};

export default ChangePasswordPage;