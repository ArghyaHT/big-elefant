import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import SignUp from "../components/SignUp/SignUp";
import Dashboard from "../components/Dashboard/Dashboard";

const DashboardPage = () => {

  return (
    <div>
        <Navbar />
        <Dashboard />
        <Footer />
    </div>
  );
};

export default DashboardPage;