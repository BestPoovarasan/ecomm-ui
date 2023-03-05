import "./login.css";
import {
  MDBSpinner,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBContainer,
} from "mdb-react-ui-kit";
import Navbar from "../navbar/Navbar";
import { config } from "../../config";
import axios from "axios";
import { useFormik, } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


// <----------formik validate---------->
const validate = (values) => {
  const errors = {};
 
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length <= 5) {
    errors.password = "please enter your password";
  }

  if (!values.email) {
    errors.email = "";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email address";
  }
  return errors;
};
export default function Login() {
  const [loading, setloading] = useState(false);

  // Login Process------------------------->
  const navigate = useNavigate();
  const log = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        setloading(true);
        const login = await axios.post(`${config.api}/login`, values);
        localStorage.setItem("react_app_token", login.data.token);
        navigate("/dashboard");
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Navbar />
      <MDBContainer className="loge">
        <h2 className="p-5">Login</h2>
        <form onSubmit={log.handleSubmit}>
          <div className="form-outline mb-4">
            <MDBInput
              type="email"
              Name="email"
              label="Email address"
              onChange={log.handleChange}
              value={log.values.email}
            />
          </div>
          <div className="form-outline mb-4">
            <MDBInput
              type="password"
              label="Password"
              Name="password"
              onChange={log.handleChange}
              value={log.values.password}
            />
          </div>
          <MDBRow className="mb-4">
            <MDBCol className="d-flex justify-content-center">
              <MDBCheckbox
                id="form7Example3"
                label="Remember me"
                defaultChecked
              />
            </MDBCol>
          </MDBRow>
          {loading ? (
            <MDBBtn disabled block className="text-center">
              <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
              Loading...
            </MDBBtn>
          ) : (
            <MDBBtn type="submit" className="mb-4" block disabled={!log.isValid}>
              Sign in
            </MDBBtn>
          )}

          <div className="text-center">
            <p>
              Not a member? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </MDBContainer>
    </>
  );
}
