import React, { Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Spinner from "../Spinner";
import { FaPowerOff } from "react-icons/fa";
import { logout } from "../../features/auth/authSlice";

function Main() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="main">
      <Suspense fallback={<Spinner />}>
        <div className="main-user">
          {user && (
            <>
              <p>
                Welcome <span>{user.name}</span>{" "}
              </p>
              <FaPowerOff
                style={{ fontWeight: "bold" }}
                className="main-user-icon"
                data-tip="Logout"
                onClick={() => {
                  dispatch(logout());
                }}
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
        <Outlet />
      </Suspense>
    </section>
  );
}

export default Main;
