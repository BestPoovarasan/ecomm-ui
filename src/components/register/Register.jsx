import "./register.css";
import { MDBSpinner, MDBInput, MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import Navbar from "../navbar/Navbar";
import { config } from "../../config";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

// <----------formik validate---------->
const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length <= 3) {
    errors.username = "Must be 4 characters or greater";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length <= 5) {
    errors.password = "Must be 6 characters or greater";
  }

  if (!values.email) {
    errors.email = "";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email address";
  }
  return errors;
};

export default function Register() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  // Register Process  Formik values------------------------------------------->
  const reg = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate,
    // <-------------Axios-------------->
    onSubmit: async (values) => {
      try {
        setloading(true);
        const register = await axios.post(`${config.api}/register`, values);
        alert(register.data.message);
        navigate("/login");
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Navbar />
      <div className="register">
        <h2 className="p-5">Sign Up</h2>

        <form onSubmit={reg.handleSubmit}>
          <MDBRow className="mb-4">
            <MDBCol>
              <MDBInput
                type="text"
                label="Username"
                Name="username"
                onChange={reg.handleChange}
                value={reg.values.username}
              />
              {reg.errors.username ? (
                <div style={{ color: "red" }}>{reg.errors.username}</div>
              ) : null}
            </MDBCol>
          </MDBRow>
          <MDBInput
            className="mb-4"
            type="email"
            Name="email"
            label="Email address"
            onChange={reg.handleChange}
            value={reg.values.email}
          />
          {reg.errors.email ? (
            <div style={{ color: "red" }}>{reg.errors.email}</div>
          ) : null}
          <MDBInput
            className="mb-4"
            type="password"
            label="Password"
            Name="password"
            onChange={reg.handleChange}
            value={reg.values.password}
          />
          {reg.errors.password ? (
            <div style={{ color: "red" }}>{reg.errors.password}</div>
          ) : null}
          {loading ? (
             <MDBBtn disabled block className='text-center'>
             <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
             Loading...
           </MDBBtn>
          ) : (
            <MDBBtn
              type="submit"
              className="mb-4"
              block
              disabled={!reg.isValid}
            >
              Sign up
            </MDBBtn>
          )}

          <div className="text-center">
            <p>
              Already have account go to <Link to="/login">Login Page</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
