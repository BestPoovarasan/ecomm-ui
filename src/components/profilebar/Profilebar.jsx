import "./profilebar.css";
import { MDBNavbar, MDBContainer } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getCartTotal } from "../../redux/cartslice";
import { Link } from "react-router-dom";
import { MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";


export const Profilebar = () => {
  const { cart, totalQuantity } = useSelector((state) => state.allCart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  let navigation = useNavigate();
  let logout = () => {
    localStorage.removeItem("react_app_token");
    navigation("/")
  }
  return (
    <>
      <MDBNavbar sticky light bgColor='light' >
        <MDBContainer className="profilebar">
          <Link to="/dashboard">
            <MDBIcon fas icon="home" />
          </Link>
          <Link to="/cartpage">
            <MDBBtn outline color="success">
              Go to Cart({totalQuantity})
            </MDBBtn>
          </Link>
          <MDBBtn outline className="" onClick={logout}>
            Logout
          </MDBBtn>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};
