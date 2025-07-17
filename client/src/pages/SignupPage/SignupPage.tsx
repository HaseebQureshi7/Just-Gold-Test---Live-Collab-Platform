import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import TextField from "../../components/ui/TextField";
import Typography from "../../components/ui/Typography";
import { useAlert } from "../../hooks/useAlert";
import useSignup from "../../hooks/useSignup";
import { PageFlex, RowFlex, ColFlex } from "../../styles/utils/flexUtils";

function SignupPage() {
  const [signupDetails, setLoginDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const { mutate: signup, isPending } = useSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({ ...signupDetails, [e.target.name]: e.target.value });
  };

  const { showAlert } = useAlert();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signupDetails.password != signupDetails.confirmPassword) {
      showAlert("Passwords do not match!", "error");
      return;
    }
    // API call here
    signup(signupDetails);
    console.log(signupDetails);
  };

  return (
    <div className="fade-in" style={{ ...PageFlex }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          ...RowFlex,
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ ...ColFlex, width: "100%", height: "100dvh" }}>
          <div
            style={{
              ...ColFlex,
              width: "50%",
              padding: "50px 25px",
              borderRadius: "25px",
              gap: "40px",
            }}
          >
            <div
              className="animated-gradient"
              style={{ ...ColFlex, width: "100%" }}
            >
              <img
                style={{
                  width: "75px",
                  aspectRatio: "auto",
                  marginBottom: "25px",
                }}
                src="/images/huddle-logo-top.png"
              />
              <Typography
                textProps={{ className: "gradient-text" }}
                styles={{ fontWeight: 500 }}
                size={2}
              >
                Signup
              </Typography>
              <Typography
                styles={{ fontWeight: 400, color: "grey" }}
                size={0.8}
              >
                Enter your email and password to create a new account
              </Typography>
            </div>

            {/* Wrap inputs in a <form> */}
            <form
              onSubmit={handleSubmit}
              style={{ ...ColFlex, width: "100%", gap: "15px" }}
            >
              <div style={{ ...RowFlex, width: "100%", gap: "15px" }}>
                <TextField
                  title="Name"
                  inputProps={{
                    name: "name",
                    placeholder: "Enter your name",
                    value: signupDetails.name,
                    onChange: handleChange,
                    required: true,
                  }}
                />
                <TextField
                  title="Email"
                  inputProps={{
                    name: "email",
                    placeholder: "Enter your email address",
                    value: signupDetails.email,
                    onChange: handleChange,
                    required: true,
                    type:"email"
                  }}
                />
              </div>
              <div style={{ ...RowFlex, width: "100%", gap: "15px" }}>
                <TextField
                  title="Password"
                  inputProps={{
                    name: "password",
                    type: "password",
                    placeholder: "Enter your password",
                    value: signupDetails.password,
                    onChange: handleChange,
                    required: true,
                  }}
                />
                <TextField
                  title="Confirm password"
                  inputProps={{
                    name: "confirmPassword",
                    type: "password",
                    placeholder: "Enter your password again",
                    value: signupDetails.confirmPassword,
                    onChange: handleChange,
                    required: true,
                  }}
                />
              </div>
              <div style={{ ...ColFlex, width: "100%", gap: "10px" }}>
                <Button fullWidth isLoading={isPending} type={"submit"}>
                  Register
                </Button>
                <Button
                fullWidth
                  onClick={() => navigate("/login")}
                  style={{
                    boxShadow: "inset 0 0 0 2px black",
                    backgroundColor: "white",
                    color: "black",
                  }}
                >
                  Log in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
