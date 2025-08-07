import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ElefantClub from "../components/ElefantClub/ElefantClub";

const ElefantsClubPage = () => {

  return (
    <div>
        <Navbar />
        <ElefantClub />
        <Footer />
    </div>
  );
};

export default ElefantsClubPage;