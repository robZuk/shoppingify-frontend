import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { useSpring, animated } from "@react-spring/web";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Spinner";
import Logo from "../../assets/logo.svg";
import { login } from "../../features/auth/authSlice";
import ConfirmButton from "../atoms/ConfirmButton";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // console.log(isSuccess)

  let inputPasswordRef = useRef();

  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 700 },
  });

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        toastId: "error",
        position: "top-center",
        theme: "colored",
      });
    }

    showPassword
      ? (inputPasswordRef.current.type = "text")
      : (inputPasswordRef.current.type = "password");

    isSuccess && user && navigate("/");
  }, [isError, isSuccess, user, navigate, dispatch, showPassword]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="modal-user-container">
      <animated.div style={props}>
        <div className="modal-user">
          <div className="modal-user-left">
            <div className="modal-user-left-header">
              <img src={Logo} alt="logo" />
              <p>
                <span className="first-word">Shoppingify</span> allows you take
                your shopping list wherever you go
              </p>
            </div>
            <p className="modal-user-left-title">Login to Your Account</p>
            <form onSubmit={onSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={onChange}
                placeholder="Enter your email"
                required
              />
              <label htmlFor="password">Password</label>
              <input
                ref={inputPasswordRef}
                type="password"
                id="password"
                name="password"
                onChange={onChange}
                placeholder="Enter password"
                minLength={5}
                required
              />
              <AiFillEye
                className="modal-user-left-eye-icon-login"
                style={{
                  display: `${showPassword ? "none" : "block"}`,
                }}
                onClick={() => {
                  setShowPassword(true);
                }}
              />
              <AiFillEyeInvisible
                className="modal-user-left-eye-icon-login"
                style={{
                  display: `${showPassword ? "block" : "none"}`,
                }}
                onClick={() => {
                  setShowPassword(false);
                }}
              />
              <ConfirmButton text="Login" />
            </form>
          </div>
          <div className="modal-user-right">
            <p className="modal-user-right-title">New Here?</p>
            <p className="modal-user-right-description">
              Sign Up and discover a great amount of new opportunities!
            </p>
            <button
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </animated.div>
    </div>
  );
}

export default Login;
