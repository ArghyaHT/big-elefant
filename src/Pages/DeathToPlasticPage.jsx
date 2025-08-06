import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import DeathToPlastic from "../components/DeathToPlastic/DeathToPlastic";

const DeathToPlasticPage = () => {

  return (
    <div>
        <Navbar />
        <DeathToPlastic />
        <Footer />
    </div>
  );
};

export default DeathToPlasticPage;