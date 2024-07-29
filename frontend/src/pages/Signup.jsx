import React, { useState } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = async () => {
    const res = await axios.post(
      "http://localhost:8080/api/v1/user/signup",
      {
        username,
        firstName,
        lastName,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.success) {
      localStorage.setItem("authtoken", res.data.token);
      navigate("/dashboard");
    }
  };
  return (
    <div className="h-screen bg-slate-300 flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <Subheading label={"Enter your infromation to create an account"} />
          <Inputbox
            placeholder={"John"}
            label={"First Name"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <Inputbox
            placeholder="Doe"
            label={"Last Name"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <Inputbox
            placeholder="harkirat@gmail.com"
            label={"Email"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Inputbox
            placeholder="123456"
            label={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button label={"Sign up"} onClick={signUp} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
