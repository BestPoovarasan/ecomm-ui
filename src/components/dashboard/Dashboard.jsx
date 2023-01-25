import "./dashboard.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBContainer,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch} from "react-redux";
import { addToCart, } from "../../redux/cartslice";
import { Profilebar } from "../profilebar/Profilebar";


export default function Dashboard() {
  const items = useSelector((state) => state.allCart.items);
  const dispatch = useDispatch();


  return (
    <>
      <Profilebar/>
      <MDBContainer className="dashboard">
        {items.map((item) => (
          <MDBCard key={item.id} className="maincard shadow-5-strong">
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image hover-overlay"
            >
              <img className="image" src={item.img}  alt="..." />
              <a>
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </a>
            </MDBRipple>
            <MDBCardBody className="cardbody">
              <h5 className="texttile">{item.title}</h5>
              <MDBCardText>Rs:{item.price}</MDBCardText>
              <MDBBtn onClick={() => dispatch(addToCart(item))}>
                Add to Cart
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        ))}
      </MDBContainer>
    </>
  );
}
