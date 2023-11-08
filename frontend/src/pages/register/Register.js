import { useLocation, useNavigate } from "react-router";
import "./register.css";
import { useRef } from "react";
import toast from "react-hot-toast";
import { createNotification, register } from "../../Api/ServerAPI";
import { useAuth } from "../../context/auth/AuthContext";
import { useSocket } from "../../context/socket/SocketContext";
import { Text } from "@chakra-ui/react";

export default function Register() {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const { auth, setAuth } = useAuth();
  const { setMessages } = useSocket();

  const navigate = useNavigate();
  const location = useLocation();

  const audio = new Audio("/audio/Facebook - Sound ! Effect.mp3");

  let from = "/";
  if (location.state && location.state.from && location.state.from.pathname) {
    from = location.state.from.pathname;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !email.current.value ||
      !username.current.value ||
      !password.current.value ||
      !confirmPassword.current.value
    ) {
      toast.error("Missing Fields");
      return;
    }

    if (confirmPassword.current.value !== password.current.value) {
      toast.error("Password don't match");
      return;
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const { data } = await register(user);
        toast.success(data.message);
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
        const message = `Welcome to facebook ${data.userInfo?.username}`;
        const welcomeMessage = {
          post: {},
          recipientId: data?.userInfo?._id,
          sender: "System",
          content: message,
        };
        const { data: notification } = await createNotification(welcomeMessage);

        setMessages((prevMessages) => [...prevMessages, notification]);

        navigate(from, { replace: true });
        audio.play();
      } catch (error) {
        if (error.response.status === 409) {
          toast.error(error.response.data.message);
        }
      }
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
              placeholder="Username"
              className="loginInput"
              ref={username}
            />
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              minLength="6"
              ref={password}
            />
            <input
              placeholder="Confirm Password"
              type="password"
              className="loginInput"
              ref={confirmPassword}
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button
              className="loginRegisterButton"
              onClick={() => navigate("/")}
            >
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
