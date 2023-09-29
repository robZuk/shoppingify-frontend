import React, { Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { Outlet } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { FaPowerOff } from "react-icons/fa";

function Main() {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="main">
      <div className="main-user">
        {userInfo && (
          <>
            <p>
              Welcome <span>{userInfo.name}</span>{" "}
            </p>
            <FaPowerOff
              style={{ fontWeight: "bold" }}
              className="main-user-icon"
              data-tip="Logout"
              onClick={logoutHandler}
            />
          </>
        )}
      </div>
      <ReactTooltip
        backgroundColor="#454545"
        effect="solid"
        place="right"
        padding="0px 8px 1px 8px"
        arrowRadius="2"
      />
      {userInfo && (
        <Suspense>
          <Outlet />
        </Suspense>
      )}
    </section>
  );
}

export default Main;
