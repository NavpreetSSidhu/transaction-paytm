import React from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

const Signin = () => {
  return (
    <div className="h-screen bg-slate-300 flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign In"} />
          <Subheading label={"Enter your credentials to access your account"} />
          <Inputbox placeholder="harkirat@gmail.com" label={"Email"} />
          <Inputbox placeholder="123456" label={"Password"} />
          <div className="pt-4">
            <Button label={"Sign In"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
