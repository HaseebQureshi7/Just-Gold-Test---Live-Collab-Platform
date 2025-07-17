import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import TextField from "../../components/ui/TextField";
import Typography from "../../components/ui/Typography";
import useLogin from "../../hooks/useLogin";
import { PageFlex, RowFlex, ColFlex } from "../../styles/utils/flexUtils";
import { useResponsive } from "../../hooks/useResponsive";

function LoginPage() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { category } = useResponsive();
  

  const { mutate: login, isPending } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // API call here
    login(loginDetails);
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
              width: category == "xs" ? "80%" : "40%",
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
                Welcome back
              </Typography>
              <Typography
                styles={{ fontWeight: 400, color: "grey", textAlign:'center' }}
                size={0.8}
              >
                Enter your email and password to access your account
              </Typography>
            </div>

            {/* Wrap inputs in a <form> */}
            <form
              onSubmit={handleSubmit}
              style={{ ...ColFlex, width: "100%", gap: "15px" }}
            >
              <TextField
                title="Email"
                inputProps={{
                  name: "email",
                  placeholder: "Enter your email address",
                  value: loginDetails.email,
                  onChange: handleChange,
                  required: true,
                }}
              />
              <TextField
                title="Password"
                inputProps={{
                  name: "password",
                  type: "password",
                  placeholder: "Enter your password",
                  value: loginDetails.password,
                  onChange: handleChange,
                  required: true,
                }}
              />
              <div style={{ ...ColFlex, width: "100%", gap: "10px" }}>
                <Button fullWidth isLoading={isPending} type={"submit"}>
                  Login
                </Button>
                <Button
                fullWidth
                onClick={() => navigate("/register")}
                  style={{
                    boxShadow: "inset 0 0 0 2px black",
                    backgroundColor: "white",
                    color: "black",
                  }}
                >
                  Sign up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
