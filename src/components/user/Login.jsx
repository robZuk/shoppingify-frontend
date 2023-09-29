import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { useSpring, animated } from "@react-spring/web";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import Logo from "../../assets/logo.svg";
// import { login, reset } from "../../features/auth/authSlice";
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

  // console.log(email, password);

  // const { user, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // );

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // console.log(userInfo);

  const inputPasswordRef = useRef();

  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 700 },
  });

  useEffect(() => {
    !showPassword
      ? (inputPasswordRef.current.type = "text")
      : (inputPasswordRef.current.type = "password");
  }, [showPassword]);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      // console.log(res);
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        toastId: "error",
        position: "top-center",
        theme: "colored",
      });
    }
  };

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
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={onChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
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
                  aria-label="show password"
                />
                <AiFillEyeInvisible
                  className="modal-user-left-eye-icon-login"
                  style={{
                    display: `${showPassword ? "block" : "none"}`,
                  }}
                  onClick={() => {
                    setShowPassword(false);
                  }}
                  aria-label="hide password"
                />
              </div>

              <ConfirmButton text={!isLoading ? "Login" : "Logging in..."} />
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
                // dispatch(reset());
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
