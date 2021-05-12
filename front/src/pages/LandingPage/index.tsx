import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { logOutUser } from "@_actions/user_action";

function LandingPage() {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.user);
  const logoutHandler = useCallback(() => {
    dispatch(logOutUser());
  }, [dispatch]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      {userData?.email}
      <h2>시작페이지</h2>
      <button onClick={logoutHandler}>로그아웃</button>
    </div>
  );
}

export default LandingPage;
