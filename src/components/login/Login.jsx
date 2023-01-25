import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBContainer,
} from "mdb-react-ui-kit";
import { config } from "../../config";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [basicActive, setBasicActive] = useState("tab1");
  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };
  // Login Process------------------------->
  const navigate = useNavigate();
  const log = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const login = await axios.post(`${config.api}/login`, values);
        localStorage.setItem("react_app_token", login.data.token);
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    },
  });
  // Register Process------------------------------------------->
  const reg = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const register = await axios.post(`${config.api}/register`, values);
        alert(register.data.message);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
    <MDBContainer className="loge">
      <MDBTabs
        pills
        className="mb-3 d-flex justify-content-center align-items-center"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab1")}
            active={basicActive === "tab1"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <Link to="/">
            <MDBIcon fas icon="home" />
          </Link>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab2")}
            active={basicActive === "tab2"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent className="d-flex justify-content-center align-items-center">
        <MDBTabsPane show={basicActive === "tab1"}>
          {/* form tags Login */}
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

            <MDBBtn type="submit" className="mb-4" block>
              Sign in
            </MDBBtn>

            <div className="text-center">
              <p>
                Not a member?{" "}
                <MDBTabsLink
                  className="registerlink"
                  onClick={() => handleBasicClick("tab2")}
                  active={basicActive === "tab2"}
                >
                  Register
                </MDBTabsLink>
                
              </p>
            </div>
          </form>
          {/* register tab 2  */}
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab2"}>
          <form onSubmit={reg.handleSubmit}>
          <div className="form-outline mb-4">
          <MDBInput
              type="text"
              label="Username"
              Name="username"
              onChange={reg.handleChange}
              value={reg.values.username}
            />
            </div>
            <div className="form-outline mb-4">

            <MDBInput
              type="email"
              Name="email"
              label="Email address"
              onChange={reg.handleChange}
              value={reg.values.email}
            />
            </div>
            <div className="form-outline mb-4">

            <MDBInput
              type="password"
              label="Password"
              Name="password"
              onChange={reg.handleChange}
              value={reg.values.password}
              />
              </div>

            <MDBCheckbox
              wrapperClass="d-flex justify-content-center mb-4"
              id="form8Example6"
              label="I have read and agree to the terms"
              defaultChecked
            />

            <MDBBtn type="submit" className="mb-4" block>
              Register
            </MDBBtn>
          </form>
        </MDBTabsPane>
      </MDBTabsContent>
       </MDBContainer>
    </>
  );
}
