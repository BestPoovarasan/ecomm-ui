import "./home.css"
import { MDBContainer } from "mdb-react-ui-kit";
import Navbar from "../navbar/Navbar";


const Home = () => {
  return (
    <div>
      <Navbar/>
      <MDBContainer>
        <img src="../images/ecomm.jpg" className="navimg shadow-4" />
      </MDBContainer>
    </div>
  );
};

export default Home;
