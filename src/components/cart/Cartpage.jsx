import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartTotal,
  removeItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../../redux/cartslice";
import { Profilebar } from "../profilebar/Profilebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { config } from "../../config";


export default function Cartpage() {
  const navigate = useNavigate();
  const [stripeToken, setStripeToken] = useState(null);
  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.allCart
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(`${config.api}/payment`, {
          tokenId: stripeToken.id,
          amount: totalPrice,
          
        });
        navigate("/success", {
          stripeData: res.data,
          });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, totalPrice,]);
 

  return (
    <>
      <MDBContainer className="py-5 h-100">
        <Profilebar />
        <MDBRow className="justify-content-center my-4">
          <MDBCol md="8">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <MDBTypography tag="h5" className="mb-0">
                  Cart - {cart.length} items
                </MDBTypography>
              </MDBCardHeader>

              <MDBCardBody>
                {cart?.map((data) => (
                  <MDBRow>
                    <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                      <MDBRipple
                        rippleTag="div"
                        rippleColor="light"
                        className="bg-image rounded hover-zoom hover-overlay"
                      >
                        <img src={data.img} className="w-100" />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.2)",
                            }}
                          ></div>
                        </a>
                      </MDBRipple>
                    </MDBCol>

                    <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                      <p>
                        <strong>{data.title}</strong>
                      </p>
                      <MDBBtn
                        type="button"
                        className="btn btn-primary btn-sm me-1 mb-2"
                        data-mdb-toggle="tooltip"
                        title="Remove item"
                        onClick={() => dispatch(removeItem(data.id))}
                      >
                        <i className="fas fa-trash"></i>
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                      <div
                        className="d-flex mb-4"
                        style={{ maxWidth: "300px" }}
                      >
                        <MDBBtn
                          className="px-3 me-2"
                          onClick={() =>
                            dispatch(decreaseItemQuantity(data.id))
                          }
                        >
                          <MDBIcon fas icon="minus" />
                        </MDBBtn>

                        <MDBInput
                          defaultValue={1}
                          min={0}
                          type="number"
                          value={data.quantity}
                          onChange={() => null}
                          label="Quantity"
                        />

                        <MDBBtn
                          className="px-3 ms-2"
                          onClick={() =>
                            dispatch(increaseItemQuantity(data.id))
                          }
                        >
                          <MDBIcon fas icon="plus" />
                        </MDBBtn>
                      </div>

                      <p className="text-start text-md-center">
                        <strong>{data.price}</strong>
                      </p>
                    </MDBCol>
                    <hr className="my-4" />
                  </MDBRow>
                ))}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4">
            <MDBCard className="mb-4">
              <MDBCardHeader>
                <MDBTypography tag="h5" className="mb-0">
                  Summary
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBListGroup flush>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>{totalQuantity}</span>
                  </MDBListGroupItem>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>{totalPrice}</strong>
                    </span>
                  </MDBListGroupItem>
                </MDBListGroup>
                <StripeCheckout
                  name="Ecomm App"
                  amount={totalPrice * 100}
                  currency="INR"
                  token={onToken}
                  stripeKey = "pk_test_51MhRGWSF51UbwnHdpw2IFeo9kltNPjhEacW2GPeCFV5GnKYWJgTgvt0ZqwdLoHMLO2DvS2Rb9G5pr2RGSf1sfnAU00vQRtTYs5"
                >
                  <MDBBtn block size="lg">
                    Go to checkout{" "}
                    <span>
                      <strong>{totalPrice}</strong>
                    </span>
                  </MDBBtn>
                </StripeCheckout>
              </MDBCardBody>
              <p>Testing cards</p>
              <p>Visa	4242424242424242,<br />Any 3 cvc digits	Any future date</p>
              <p>Mastercard	5555555555554444<br/>	Any 3cvc digits	Any future date</p>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
