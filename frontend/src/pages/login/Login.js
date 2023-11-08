import { useRef, useState } from "react";
import "./login.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth/AuthContext";
import { login } from "../../Api/ServerAPI";
import { Button } from "@mui/material";
import { Text } from "@chakra-ui/react";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  let from = "/";
  if (location.state && location.state.from && location.state.from.pathname) {
    from = location.state.from.pathname;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const { data } = await login(email.current.value, password.current.value);
      toast.success(data?.message);
      setIsLoading(false);

      setAuth({
        ...auth,
        userInfo: data.userInfo,
        token: data.token,
      });

      const authData = {
        userInfo: data.userInfo,
        token: data.token,
      };

      localStorage.setItem("auth", JSON.stringify(authData));
      localStorage.setItem("timeSpent", 0);

      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      if (!err || !err.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error("Missing Username or Password");
      } else if (err?.response?.status === 404) {
        toast.error(err?.response?.data.message);
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Login Failed");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">
            <div style={{ display: "flex" }}>
              <img src="facebook_icon.png" width="40" height="40" alt="" />
              <Text marginLeft="20px" fontWeight="bold" fontSize={28}>
                Facebook
              </Text>
            </div>
          </h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              disabled={isLoading}
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              disabled={isLoading}
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isLoading}>
              {isLoading ? <CircularProgress color="inherit" /> : "Log in"}
            </button>
            <Button
              className="loginForgot"
              onClick={() => navigate("/forgotPassword")}
            >
              Forgot Password?
            </Button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="loginRegisterButton"
            >
              {isLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
